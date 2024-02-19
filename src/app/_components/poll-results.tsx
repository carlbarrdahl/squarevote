"use client";

import type { Vote } from "@prisma/client";
import type { TOption } from "~/server/api/routers/poll/poll.schema";
import { Table, Td, Th, Tr } from "~/app/_components/ui/table";
import { api } from "~/trpc/react";

function sumVotes(voteEntries: Vote[] = []): Record<string, number> {
  const voteSums: Record<string, number> = {};
  voteEntries.forEach((entry) =>
    entry.votes.forEach(
      (vote, index) => (voteSums[index] = (voteSums[index] ?? 0) + vote),
    ),
  );

  return voteSums;
}

export function PollResults({
  id,
  options,
}: {
  id: string;
  options: TOption[];
}) {
  const votes = api.poll.votes.useQuery(
    { pollId: id },
    { refetchInterval: 5000 },
  );

  const voteSums = sumVotes(votes.data);

  return (
    <div className="w-full rounded-lg border">
      <Table>
        <thead>
          <Tr>
            <Th>Vote option</Th>
            <Th>Total votes</Th>
          </Tr>
        </thead>
        <tbody>
          {options.map(({ name }, i) => (
            <Tr key={i}>
              <Td className="">{name}</Td>
              <Td>{voteSums[i]}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
