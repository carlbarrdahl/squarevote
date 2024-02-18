import { HomeIcon, ListPlusIcon, Rows3Icon, UserIcon } from "lucide-react";
import { NavLink } from "../_components/nav-link";
import { api } from "~/trpc/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <aside className="fixed h-full w-16 border-r border-gray-100 p-1 sm:w-48 sm:p-4">
        <nav className="space-y-1">
          <NavLink href="/dashboard" icon={<HomeIcon />}>
            Home
          </NavLink>

          <NavLink href="/dashboard/settings" icon={<UserIcon />}>
            Account
          </NavLink>

          <NavLink href="/dashboard/new" icon={<ListPlusIcon />}>
            New Poll
          </NavLink>

          <PollList />
        </nav>
      </aside>
      <div className="max-w-screen-xl flex-1 pl-16 sm:pl-48">
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}

async function PollList() {
  const polls = await api.poll.list.query();
  return (
    <>
      <h3 className="mb-2 pt-8 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
        Polls
      </h3>

      <nav className="space-y-1">
        {polls.map((poll) => (
          <NavLink
            key={poll.id}
            href={`/dashboard/${poll.id}`}
            icon={<Rows3Icon />}
          >
            {poll.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
