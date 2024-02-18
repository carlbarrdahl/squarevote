import type { Vote } from "@prisma/client";
import { format } from "date-fns/format";
import { notFound } from "next/navigation";

import { PageSection } from "~/app/_components/page-section";
import { Table, Td, Th, Tr } from "~/app/_components/ui/table";
import { api } from "~/trpc/server";

type Props = {
  params: { pollId: string };
};

function sumVotes(voteEntries: Vote[]): Record<string, number> {
  const voteSums: Record<string, number> = {};
  voteEntries.forEach((entry) =>
    entry.votes.forEach(
      (vote, index) => (voteSums[index] = (voteSums[index] ?? 0) + vote),
    ),
  );

  return voteSums;
}

export default async function DashboardPollPage({ params: { pollId } }: Props) {
  const poll = await api.poll.get.query({ id: pollId });
  const votes = await api.poll.votes.query({ pollId });
  if (!poll) return notFound();

  const voteSums = sumVotes(votes);
  3;
  return (
    <PageSection title={poll.name} description="">
      <div className="w-full space-y-2 rounded-lg border p-4">
        <Table>
          <thead>
            <Tr>
              <Th>Vote option</Th>
              <Th>Total votes</Th>
            </Tr>
          </thead>
          <tbody>
            {(poll.options as { name: string }[]).map(({ name }, i) => (
              <Tr key={i}>
                <Td className="">{name}</Td>
                <Td>{voteSums[i]}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="w-full rounded-lg border">
        <Table>
          <thead>
            <Tr>
              <Th>Voter</Th>
              <Th>Voted at</Th>
              <Th>Votes</Th>
            </Tr>
          </thead>
          <tbody>
            {votes.length ? (
              votes.map((vote) => (
                <Tr key={vote.id}>
                  <Td>{vote.voter}</Td>
                  <Td>{format(vote.createdAt, "yyyy-MM-dd HH:mm")}</Td>
                  <Td>{vote.votes.join(", ")}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3} className="text-center text-gray-500">
                  No one has voted yet
                </Td>
              </Tr>
            )}
          </tbody>
        </Table>
      </div>
    </PageSection>
  );
}
