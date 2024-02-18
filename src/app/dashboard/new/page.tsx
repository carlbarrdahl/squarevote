import { PageSection } from "~/app/_components/page-section";
import { PollForm } from "~/app/_components/poll-form";

export default function CreatePollPage() {
  return (
    <PageSection
      title="Create a new poll"
      description="Create a poll for your friends to vote on."
    >
      <PollForm />
    </PageSection>
  );
}
