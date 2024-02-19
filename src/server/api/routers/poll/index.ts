import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { Poll, PrismaClient } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { ZPollCreateInputSchema } from "./poll.schema";

async function getPoll(id: string, db: PrismaClient) {
  return (await db.poll.findFirst({
    where: { id },
  })) as Poll & { options: { name: string }[] };
}

export const pollRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      console.log(ctx.headers);
      return getPoll(id, ctx.db);
    }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.poll.findMany({
      where: { userId: ctx.user.id },
    });
  }),

  votes: publicProcedure
    .input(z.object({ pollId: z.string() }))
    .query(({ ctx, input: { pollId } }) => {
      return ctx.db.vote.findMany({ where: { pollId } });
    }),

  vote: publicProcedure
    .input(
      z.object({
        pollId: z.string(),
        voter: z.string().min(3),
        votes: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input: { pollId, voter, votes } }) => {
      const poll = await getPoll(pollId, ctx.db);
      if ((poll?.options).length !== votes.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Poll options and vote input mismatch",
        });
      }
      if (votes.reduce((sum, x) => sum + x * x, 0) > poll.voiceCredits) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Votes must not exceed voice credits",
        });
      }
      return ctx.db.vote.create({ data: { voter, votes, pollId } });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input: { id } }) => {
      return ctx.db.poll.delete({ where: { id, userId: ctx.user.id } });
    }),

  save: protectedProcedure
    .input(ZPollCreateInputSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const userId = ctx.user.id;
      if (!id) {
        return ctx.db.poll.create({ data: { ...data, userId } });
      }
      const votingStarted = await ctx.db.vote.findFirst({
        where: { pollId: id },
      });

      if (votingStarted) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Voting already started",
        });
      }
      return ctx.db.poll.update({ where: { id, userId }, data });
    }),
});
