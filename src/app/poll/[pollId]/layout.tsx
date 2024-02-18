import { notFound } from "next/navigation";
import { Markdown } from "~/app/_components/ui/markdown";
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
      <div className="mx-auto min-h-96 max-w-screen-sm">
        <div className="mb-4">
          <h1 className="mb-3 text-3xl font-semibold tracking-wide">
            {poll.name}
          </h1>
          <Markdown>{poll.description}</Markdown>
        </div>
        {children}
      </div>
    </div>
  );
}
