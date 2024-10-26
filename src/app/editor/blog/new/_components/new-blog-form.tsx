"use client";

import UploadModal from "@/app/editor/blog/new/_components/upload/upload-modal";
import { createBlog } from "@/app/editor/blog/new/actions";
import { AuthorUser, newBlogSchema } from "@/app/editor/blog/new/types";
import { Button } from "@/components/ui/button";
import TailwindAdvancedEditor from "@/components/ui/editor/advanced-editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tags, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function checkURL(url: string) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export default function NewBlogForm({
  user,
  authorUsers,
  tags,
}: {
  user: User;
  authorUsers: AuthorUser[];
  tags: Tags[];
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(newBlogSchema),
    defaultValues: {
      picture: "",
      name: "",
      previewContent: "",
      content: "",
      tagIds: [],
      authorIds: [user.id],
      nodes: {},
    },
  });

  const onSubmit = async (data: z.infer<typeof newBlogSchema>) => {
    const promise = createBlog(data);
    toast.promise(promise, {
      loading: "Creating blog...",
      success: "Blog created successfully!",
      error: (err) => {
        console.error(err);
        return "Error creating blog.";
      },
    });
    const [error, res] = await promise;
    if (error) return;
    router.push(`/editor/blog/${res?.blogId}`);
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="p-4 font-sans text-5xl font-bold">New Blog</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="font-sans">
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>Picture</FormLabel>
                <div className="mx-4 flex flex-col items-center rounded-sm border border-black bg-white">
                  {checkURL(field.value) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={field.value}
                      alt={field.value}
                      className="rounded-lg object-contain"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-md border border-dashed border-gray-300" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <UploadModal
                    onSuccess={(url) => {
                      form.setValue("picture", url);
                    }}
                  />
                </div>
                <FormDescription>
                  Enter a URL for an image or upload an image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of the blog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tagIds"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>Select Tag(s)</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <MultiSelect
                      options={tags.map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                      }))}
                      onValueChange={field.onChange}
                      defaultValue={[user.id]}
                      placeholder="Select tag(s)"
                      variant="inverted"
                      animation={0.3}
                      maxCount={5}
                      value={field.value}
                    />
                  </FormControl>
                  <Button variant="tertiary" type="button">
                    +
                  </Button>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorIds"
            render={({ field }) => (
              <FormItem className="m-4">
                <FormLabel>Select Author(s)</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={authorUsers.map((u) => ({
                      label:
                        u.email === user.email
                          ? "Myself"
                          : u.name + " - " + u.email,
                      value: u.id,
                    }))}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select author(s)"
                    variant="inverted"
                    animation={0.3}
                    maxCount={5}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  This is the author of the blog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="m-4">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TailwindAdvancedEditor
                    editorKey={["blog", "new"]}
                    onChange={(editor) => {
                      form.setValue("content", editor.getHTML());
                      form.setValue("previewContent", editor.getText());
                      form.setValue("nodes", JSON.stringify(editor.getJSON()));
                    }}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  This is the content of the blog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="m-4">
            <Button variant="tertiary" className="w-full">
              Create Blog
            </Button>
          </FormItem>
        </form>
      </Form>
    </div>
  );
}
