import { PageSection } from "~/app/_components/page-section";
import { PollForm } from "~/app/_components/poll-form";
import { type TPollCreateInputSchema } from "~/server/api/routers/poll/poll.schema";
import { api } from "~/trpc/server";

type Props = {
  params: { pollId: string };
};
export default async function DashboardPollSettingsPage({
  params: { pollId },
}: Props) {
  const poll = await api.poll.get.query({ id: pollId });
  return (
    <PageSection title="Edit poll" description="Update your poll.">
      <PollForm defaultValues={poll as TPollCreateInputSchema} />
    </PageSection>
  );
}
