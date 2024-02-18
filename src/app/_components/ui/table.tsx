import { tv } from "tailwind-variants";
import { createComponent } from "~/app/_components/ui";

export const Table = createComponent(
  "table",
  tv({ base: "w-full table-fixed" }),
);
export const Th = createComponent(
  "th",
  tv({ base: "text-left text-gray-500 font-normal p-4" }),
);

export const Td = createComponent(
  "td",
  tv({ base: "p-1 sm:p-4 block sm:table-cell text-sm sm:text-base" }),
);
export const Tr = createComponent(
  "tr",
  tv({ base: "border-b block sm:table-row" }),
);
