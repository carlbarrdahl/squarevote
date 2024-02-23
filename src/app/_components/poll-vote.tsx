"use client";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button";

import { cn } from "~/utils/cn";
import { Input } from "./ui/form/inputs";
import { Form } from "./ui/form";
import { z } from "zod";
import { Fieldset } from "./ui/form/fieldset";
import { api } from "~/trpc/react";

type Option = {
  name: string;
};
export function useVote(options: Option[]) {
  const [votes, setVotes] = useState(
    options?.reduce(
      (acc, _, i) => ({ ...acc, [i]: 0 }),
      {} as Record<string, number>,
    ),
  );

  const inc = (id: string) => {
    return setVotes({ ...votes, [id]: (votes[id] ?? 0) + 1 });
  };
  const dec = (id: string) =>
    setVotes({ ...votes, [id]: (votes[id] ?? 0) - 1 });

  const reset = () => setVotes({});

  return { inc, dec, reset, votes };
}

function calcCost(votes: number) {
  return votes * votes;
}
function calcSpent(votes: Record<string, number>) {
  return Object.values(votes ?? {}).reduce(
    (sum, vote) => sum + calcCost(vote ?? 0),
    0,
  );
}

export function PollVote({
  id,
  options,
  voiceCredits,
}: {
  id: string;
  options: Option[];
  voiceCredits: number;
}) {
  const vote = useVote(options);
  const castVotes = api.poll.vote.useMutation({});
  const creditsSpent = calcSpent(vote.votes);
  const creditsLeft = voiceCredits - creditsSpent;

  return (
    <Form
      schema={z.object({
        voter: z
          .string()
          .min(3, { message: "Enter a name to vote (min 3 letters)" }),
      })}
      onSubmit={({ voter }) => {
        castVotes.mutate({
          pollId: id,
          voter,
          votes: Object.values(vote.votes),
        });
      }}
    >
      <div className="divide-y rounded-lg border">
        {options?.map(({ name }, i) => {
          const id = String(i);
          const qty = vote.votes[id] ?? 0;

          return (
            <div key={id} className="flex h-16 items-center gap-2 p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{name}</h3>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 pl-1 text-xs">
                  <div>
                    <Button
                      className="size-10 rounded-full"
                      disabled={calcCost(qty + 1) > creditsLeft && qty <= 0}
                      onClick={() => vote.dec(id)}
                    >
                      −
                    </Button>
                  </div>
                  <div
                    className={cn("w-4 text-center", {
                      ["font-bold"]: qty,
                      ["text-red-700"]: qty < 0,
                    })}
                  >
                    {qty}
                  </div>
                  <div>
                    <Button
                      className="size-10 rounded-full"
                      disabled={calcCost(qty - 1) > creditsLeft && qty >= 0}
                      onClick={() => vote.inc(id)}
                    >
                      ＋
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={cn("p-2 text-right", {
          ["text-red-600"]: creditsLeft < 0,
        })}
      >
        Voice credits: {creditsLeft}
      </div>

      {castVotes.isSuccess ? null : (
        <div className="flex justify-end gap-2">
          <Fieldset name="voter">
            <Input placeholder="Your name..." />
          </Fieldset>
          <div>
            <Button
              type="submit"
              disabled={creditsLeft < 0}
              variant="primary"
              className="w-48"
              icon={CheckCircle}
            >
              Vote
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
