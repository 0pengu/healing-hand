import { EditorBubble, useEditor } from "novel";
import { removeAIHighlight } from "novel/extensions";
import {} from "novel/plugins";
import { type ReactNode, useEffect } from "react";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
  }, [editor, open]);

  if (!editor) return null;

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        },
      }}
      className="border-muted flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-background shadow-xl"
    >
      {children}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
