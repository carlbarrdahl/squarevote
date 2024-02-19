import { notFound } from "next/navigation";
import { PollResults } from "~/app/_components/poll-results";

import { api } from "~/trpc/server";

type Props = { params: { pollId: string } };

export default async function PollPage({ params: { pollId } }: Props) {
  const poll = await api.poll.get.query({ id: pollId });

  if (!poll) return notFound();

  return (
    <div>
      <h3 className="mb-2 px-1 text-lg font-semibold">Results</h3>
      <PollResults id={pollId} options={poll.options} />
    </div>
  );
}
