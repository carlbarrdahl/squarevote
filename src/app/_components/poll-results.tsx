"use client";

import type { Vote } from "@prisma/client";
import type { TOption } from "~/server/api/routers/poll/poll.schema";
import { Table, Td, Th, Tr } from "~/app/_components/ui/table";
import { api } from "~/trpc/react";
import { useMemo } from "react";

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

  const sortedResults = useMemo(
    () =>
      options
        .map(({ name }, i) => ({ name, votes: voteSums[i] ?? 0 }))
        .sort((a, b) => b.votes - a.votes),
    [options, voteSums],
  );

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
          {sortedResults.map(({ name, votes }, i) => (
            <Tr key={i}>
              <Td className="">{name}</Td>
              <Td>{votes}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
