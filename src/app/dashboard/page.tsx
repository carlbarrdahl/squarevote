import Link from "next/link";
import { api } from "~/trpc/server";
import { PageSection } from "../_components/page-section";
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import { PollList } from "../_components/poll-list";

export default async function DashboardPage() {
  const polls = await api.poll.list.query();

  return (
    <PageSection
      title="My Polls"
      description="Find all your created polls"
      action={
        <Button
          as={Link}
          href={`/dashboard/new`}
          icon={PlusIcon}
          variant="primary"
        >
          Create Poll
        </Button>
      }
    >
      <PollList polls={polls} />
    </PageSection>
  );
}
