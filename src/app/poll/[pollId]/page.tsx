import { notFound } from "next/navigation";
import { PollVote } from "~/app/_components/poll-vote";

import { api } from "~/trpc/server";

type Props = { params: { pollId: string } };

export default async function PollPage({ params: { pollId } }: Props) {
  const poll = await api.poll.get.query({ id: pollId });

  if (!poll) return notFound();

  return (
    <div>
      <PollVote {...poll} />
    </div>
  );
}
