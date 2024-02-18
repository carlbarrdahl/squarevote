import { cloneElement, type ReactElement, type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./label";

type FormControlProps = {
  name: string;
  label?: string;
  hint?: string;
  setValueAs?: (v: string) => number | string | Date | null;
  onBlur?: (value: string | number) => void;
} & ComponentProps<"fieldset">;

export function Fieldset({
  label,
  hint,
  name,
  setValueAs,
  onBlur,
  children,
}: FormControlProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <fieldset className="flex-1">
      {label && <Label htmlFor={name}>{label}</Label>}
      {cloneElement(children as ReactElement, {
        id: name,
        ...register(name, {
          setValueAs,
          /* eslint-disable-next-line */
          onBlur: (e) => onBlur?.(e.target.value),
        }),
      })}
      {error && (
        <span className="text-xs text-red-500">{error.message as string}</span>
      )}
      {hint ? <div className="pt-1 text-xs text-gray-500">{hint}</div> : null}
    </fieldset>
  );
}
