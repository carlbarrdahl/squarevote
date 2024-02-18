import { tv } from "tailwind-variants";

import { createComponent } from "..";

const inputBase = ["rounded-lg", "w-full", "border-gray-300"];
export const Input = createComponent(
  "input",
  tv({
    base: inputBase.concat("form-input"),
  }),
);

export const Textarea = createComponent(
  "textarea",
  tv({
    base: inputBase.concat("form-textarea"),
  }),
);

export const Select = createComponent(
  "select",
  tv({
    base: inputBase.concat("form-select"),
  }),
);
