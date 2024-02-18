import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  title: string;
  description: string;
  action?: ReactNode;
}>;

export function PageSection({ title, description, action, children }: Props) {
  return (
    <section className="">
      <header className="mb-2 ">
        <div className="flex items-center justify-between">
          <h1 className="pb-2 pt-2 text-2xl font-semibold tracking-wide">
            {title}
          </h1>
          {action}
        </div>
        <p className="mb-4 text-gray-500">{description}</p>
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
