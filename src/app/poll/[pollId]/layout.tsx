import { notFound } from "next/navigation";
import { api } from "~/trpc/server";

export default async function PollLayout({
  children,
  params: { pollId },
}: {
  children: React.ReactNode;
  params: { pollId: string };
}) {
  const poll = await api.poll.get.query({ id: pollId });

  if (!poll) return notFound();

  return (
    <div className="flex-1 px-2 py-8">
      <div className="mx-auto min-h-96 max-w-screen-sm">{children}</div>
    </div>
  );
}
