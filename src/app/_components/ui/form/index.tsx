import { type z } from "zod";
import { type ComponentProps } from "react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps<S extends z.Schema> extends ComponentProps<"form"> {
  defaultValues?: UseFormProps<z.infer<S>>["defaultValues"];
  schema: S;
  onSubmit: SubmitHandler<z.infer<S>>;
}
export function Form<S extends z.Schema>({
  defaultValues,
  className,
  schema,
  children,
  onSubmit,
}: FormProps<S>) {
  const form = useForm<S>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const errors = form.formState.errors;

  console.log(errors);
  return (
    <FormProvider {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
      >
        {children}
      </form>
    </FormProvider>
  );
}

/**
 * Create a date YYYY-MM-DD date string that is typecasted as a `Date`.
 * Hack when using `defaultValues` in `react-hook-form`
 * This is because `react-hook-form` doesn't support `defaultValue` of type `Date` even if the types say so
 */
export function dateToInputDate(date?: Date | null) {
  if (!date || !isValidDate(date)) {
    return undefined;
  }
  return date.toJSON().slice(0, 10) as unknown as Date;
}

function isValidDate(date: Date) {
  return !isNaN(date.getTime());
}
