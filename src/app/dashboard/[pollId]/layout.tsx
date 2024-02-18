import { PollNavigation } from "~/app/_components/poll-nav";

export default async function DashboardPollLayout({
  children,
  params: { pollId },
}: {
  children: React.ReactNode;
  params: { pollId: string };
}) {
  return (
    <div className="flex-1">
      <PollNavigation pollId={pollId} />
      {children}
    </div>
  );
}
