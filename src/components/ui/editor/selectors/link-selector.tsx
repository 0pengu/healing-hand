import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Trash } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useRef } from "react";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}
interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus();
  });
  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="rounded-none border-none" variant="black">
          <p className="text-base">↗</p>
          <p
            className={cn("underline decoration-stone-400 underline-offset-4", {
              "text-blue-500": editor.isActive("link"),
            })}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement;
            e.preventDefault();
            const input = target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            if (url) {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
              onOpenChange(false);
            }
          }}
          className="flex p-1"
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="mr-2 flex-1 border-none p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <Button
              size="icon"
              variant="destructive"
              type="button"
              className="flex h-9 items-center rounded-sm p-1"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
                onOpenChange(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="icon" className="h-9">
              <Check className="h-4 w-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
