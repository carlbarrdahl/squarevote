import { NavLink } from "./nav-link";

export function PollNavigation({ pollId = "" }) {
  return (
    <nav className="flex flex-wrap gap-2">
      <NavLink href={`/dashboard/${pollId}`} icon={null}>
        Results
      </NavLink>

      <NavLink href={`/dashboard/${pollId}/settings`} icon={null}>
        Settings
      </NavLink>
    </nav>
  );
}
