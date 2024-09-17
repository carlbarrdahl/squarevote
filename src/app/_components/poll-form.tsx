"use client";

import { useRouter } from "next/navigation";

import {
  type TPollCreateInputSchema,
  ZPollCreateInputSchema,
} from "~/server/api/routers/poll/poll.schema";
import { Form } from "./ui/form";
import { Fieldset } from "./ui/form/fieldset";
import { Input, Select, Textarea } from "./ui/form/inputs";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import type { PropsWithChildren } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash } from "lucide-react";

const DEFAULT_VALUES = {
  name: "Tonight's Movie",
  description: "Let's all decide on what movie to watch tonight!",
};
export function PollForm({
  defaultValues,
}: {
  defaultValues?: Partial<TPollCreateInputSchema>;
}) {
  const router = useRouter();

  const save = api.poll.save.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/dashboard/${id}`);
      router.refresh();
    },
  });
  return (
    <Form
      defaultValues={{
        voiceCredits: 25,
        options: Array(3)
          .fill(0)
          .map(() => ({ name: "" })),
        ...defaultValues,
      }}
      schema={ZPollCreateInputSchema}
      onSubmit={(values) => {
        save.mutate(values);
      }}
    >
      <FormField
        title="Name"
        description="Enter a name for your poll. You can change this later."
      >
        <Fieldset name="name">
          <Input placeholder="Tonights movie" />
        </Fieldset>
      </FormField>
      <FormField
        title="Description"
        description="Describe your poll. Markdown is supported."
      >
        <Fieldset name="description">
          <Textarea
            rows={6}
            placeholder="Let's all decide on what movie to watch tonight!"
          />
        </Fieldset>
      </FormField>

      <FormField
        title="Voice credits"
        description="How many votes do each participant get?"
      >
        <Fieldset name="voiceCredits" setValueAs={(v: string) => Number(v)}>
          <Select>
            <option value={99}>99</option>
            <option value={24}>24</option>
            <option value={15}>15</option>
            <option value={8}>8</option>
          </Select>

          {/* <Input type="number" /> */}
        </Fieldset>
      </FormField>

      <FormField title="Options" description="Add your options to vote for">
        <PollOptions />
      </FormField>

      <div className="flex justify-end">
        <Button
          isLoading={save.isLoading}
          type="submit"
          variant="primary"
          size="lg"
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

function PollOptions() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  return (
    <div className="flex-1">
      <div className="mb-1 flex items-center justify-between">
        <div className="px-1 text-sm">
          {fields.length} / {10}
        </div>
        <Button icon={Plus} onClick={() => append({ name: "" })}>
          Add
        </Button>
      </div>
      <div className="space-y-1">
        {fields.map((field, i) => (
          <div key={i} className="flex gap-1">
            <Fieldset name={`options.${i}.name`}>
              <Input placeholder={`Option ${i + 1}`} />
            </Fieldset>
            <Button
              variant="ghost"
              icon={Trash}
              tabIndex={-1}
              onClick={() => remove(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormField({
  children,
  title,
  description,
}: PropsWithChildren<{ title: string; description: string }>) {
  return (
    <div className="gap-8 pb-4 md:flex">
      <div className="w-64">
        <label className="text-lg font-medium">{title}</label>
        <p className="pb-4 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}
