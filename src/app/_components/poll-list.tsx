"use client";
import Link from "next/link";
import {
  ExternalLink,
  List,
  QrCode,
  User,
  type LucideIcon,
} from "lucide-react";
import type { Poll } from "@prisma/client";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { type PropsWithChildren, createElement } from "react";

export function PollList({ polls }: { polls: Poll[] }) {
  return (
    <div className="divide-y rounded-lg border">
      {polls.map((poll) => (
        <PollItem key={poll.id} {...poll} />
      ))}
    </div>
  );
}

function PollItem({ id, name, options }: Poll) {
  const votes = api.poll.votes.useQuery({ pollId: id });

  return (
    <div className="flex hover:bg-gray-50">
      <Link href={`/dashboard/${id}`} className="flex-1 p-4 ">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex gap-2">
          <Meta icon={User}>{votes.data?.length ?? "?"}</Meta>
          <Meta icon={List}>{options.length}</Meta>
        </div>
      </Link>
      <div className="flex items-center gap-1 pr-4">
        <Button
          icon={ExternalLink}
          as={Link}
          href={`/poll/${id}`}
          target="_blank"
        />
        <Button
          icon={QrCode}
          as={Link}
          href={`/poll/${id}/opengraph-image`}
          target="_blank"
        />
      </div>
    </div>
  );
}

function Meta({ icon, children }: PropsWithChildren<{ icon: LucideIcon }>) {
  return (
    <div className="inline-flex items-center gap-2 rounded bg-gray-100 px-2 py-1 text-xs">
      {createElement(icon, { className: "size-3" })}
      <span className="font-semibold">{children}</span>
    </div>
  );
}
