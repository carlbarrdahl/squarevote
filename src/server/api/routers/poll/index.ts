import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { Poll, PrismaClient } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { ZPollCreateInputSchema } from "./poll.schema";
import { verifyProof } from "@semaphore-protocol/proof";

async function getPoll(id: string, db: PrismaClient) {
  return (await db.poll.findFirst({
    where: { id },
  })) as Poll & { options: { name: string }[] };
}

export const pollRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
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

  register: publicProcedure
    .input(z.object({ id: z.string(), commitment: z.string() }))
    .mutation(async ({ ctx, input: { id, commitment } }) => {
      const group = await ctx.db.poll
        .findFirst({ where: { id }, select: { group: true } })
        .then((r) => r?.group ?? []);

      if (!group?.includes(commitment)) {
        group.push(commitment);
        await ctx.db.poll.update({ where: { id }, data: { group } });
      }
      return group;
    }),
  vote: publicProcedure
    .input(
      z.object({
        pollId: z.string(),
        voter: z.string().min(3),
        votes: z.array(z.number()),
        proof: z.object({
          merkleTreeDepth: z.number(),
          merkleTreeRoot: z.string(),
          nullifier: z.string(),
          message: z.string(),
          scope: z.string(),
          points: z.tuple([
            z.string(),
            z.string(),
            z.string(),
            z.string(),
            z.string(),
            z.string(),
            z.string(),
            z.string(),
          ]),
        }),
      }),
    )
    .mutation(async ({ ctx, input: { pollId, proof, voter, votes } }) => {
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
      if (
        await ctx.db.vote.findFirst({
          where: { pollId, nullifier: proof.nullifier },
        })
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already voted",
        });
      }
      console.log("verifying proof");

      // TODO: why does it hang here?
      if (!(await verifyProof(proof))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid zk proof",
        });
      }

      console.log("proof verified!");

      // TODO: remove voter from Vote in schema + poll-vote component (nullifier is used as user id)

      return ctx.db.vote.create({
        data: { voter, votes, pollId, nullifier: proof.nullifier },
      });
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
