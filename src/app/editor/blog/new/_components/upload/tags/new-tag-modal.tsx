import { createTag } from "@/app/editor/blog/new/_components/upload/tags/actions";
import { newTagSchema } from "@/app/editor/blog/new/_components/upload/tags/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tags } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function NewTagModal({
  tags,
  setNewTag,
}: {
  tags: Tags[];
  setNewTag: (tag: Tags) => void;
}) {
  const [open, setOpen] = useState(false);

  const schema = newTagSchema(tags);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const promise = createTag(data);
    toast.promise(promise, {
      loading: "Creating tag...",
      success: "Tag created successfully!",
      error: (err) => {
        console.error(err);
        return "Failed to create tag";
      },
    });
    const [error, res] = await promise;
    if (error || !res) return;
    setOpen(false);
    setNewTag(res.tag);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="tertiary" type="button">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        <DialogTitle>
          Create new tag. Duplicate tag names are not allowed.
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter name of tag"
                  className="w-full rounded-sm border border-black p-2"
                />
              )}
            />
            {form.formState.errors.name && (
              <div className="text-red-500">
                {form.formState.errors.name.message}
              </div>
            )}
            <Button type="submit" className="mt-4 w-full">
              Create Tag
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
