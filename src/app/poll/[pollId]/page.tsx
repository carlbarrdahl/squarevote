import Link from "next/link";
import { notFound } from "next/navigation";
import { PollVote } from "~/app/_components/poll-vote";
import { A } from "~/app/_components/ui/a";
import { Markdown } from "~/app/_components/ui/markdown";

import { api } from "~/trpc/server";

type Props = { params: { pollId: string } };

export default async function PollPage({ params: { pollId } }: Props) {
  const poll = await api.poll.get.query({ id: pollId });

  if (!poll) return notFound();

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-3 text-3xl font-semibold tracking-wide">
          {poll.name}
        </h1>
        <Markdown>{poll.description}</Markdown>
      </div>
      <PollVote {...poll} />

      <div className="py-8 text-center">
        <A href={`/poll/${pollId}/results`}>View results</A>
      </div>
    </div>
  );
}
