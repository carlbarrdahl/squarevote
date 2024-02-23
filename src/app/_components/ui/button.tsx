import {
  createElement,
  type ComponentPropsWithRef,
  type FunctionComponent,
} from "react";
import { tv } from "tailwind-variants";

import { createComponent } from ".";
import { cn } from "~/utils/cn";
import { Spinner } from "./spinner";

const ButtonComponent = createComponent(
  "button",
  tv({
    base: "inline-flex transition-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 ",
        danger: "bg-red-600 text-red-100 hover:bg-red-600/90 ",
        default: "bg-gray-100 hover:bg-gray-200/80 text-gray-900",
        ghost: "hover:bg-gray-200/80 text-gray-900",
      },
      size: {
        icon: "p-3",
        md: "px-4 py-3",
        lg: "px-4 py-3 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }),
);

export function Button({
  icon,
  children,
  isLoading,
  ...props
}: ComponentPropsWithRef<typeof ButtonComponent> & {
  /*eslint-disable @typescript-eslint/no-explicit-any */
  icon?: FunctionComponent<any>;
  isLoading?: boolean;
}) {
  const Icon = isLoading ? Spinner : icon;
  return (
    <ButtonComponent
      type="button"
      role="button"
      disabled={isLoading}
      size={icon && !children ? "icon" : undefined}
      {...props}
    >
      {Icon &&
        createElement(Icon, {
          className: cn("size-4", { ["mr-2"]: Boolean(children) }),
        })}
      {children}
    </ButtonComponent>
  );
}
