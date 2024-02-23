import Link from "next/link";
import { tv } from "tailwind-variants";
import { createComponent } from ".";

export const A = createComponent(
  Link,
  tv({ base: "underline underline-offset-2 hover:text-gray-700" }),
);
