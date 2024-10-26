"use client";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { Separator } from "@/components/ui/separator";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { cn } from "@/lib/utils";
import "./editor.css";
import LocalDataLoader from "@/components/ui/editor/local-data/local-data-loader";
import { useLocalDataStore } from "@/components/ui/editor/local-data/store";
import { useSearchParams } from "next/navigation";

const extensions = [...defaultExtensions, slashCommand];

const TailwindAdvancedEditor = ({
  className = "",
  onChange = (editor: EditorInstance) => {
    console.log(editor.getJSON());
  },
  prevContent = "",
  editorKey,
  editable = true,
}: {
  className?: string;
  onChange?: (editor: EditorInstance) => void;
  prevContent?: unknown;
  editorKey: string[];
  editable?: boolean;
}) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null,
  );
  const [, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const searchParams = useSearchParams();

  const local = searchParams.has("local")
    ? searchParams.get("local") === "true"
    : false;

  // useEffect(() => {
  //   if (local) {
  //     const url = new URL(window.location.href);
  //     url.searchParams.delete("local");
  //     window.history.pushState({}, "", url.toString());
  //   }
  // }, [local]);

  const setLocalLoaded = useLocalDataStore((state) => state.setLoaded);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  // const highlightCodeblocks = (content: string) => {
  //   const doc = new DOMParser().parseFromString(content, "text/html");
  //   doc.querySelectorAll("pre code").forEach(
  //     (
  //       el, // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
  //       //@ts-expect-error - highlight.js types are not accurate
  //     ) => hljs.highlightElement(el),
  //   );
  //   return new XMLSerializer().serializeToString(doc);
  // };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setLocalLoaded(true);
      const json = editor.getJSON();
      setCharsCount(editor.storage.characterCount.words());
      window.localStorage.setItem(
        `novel-content-${editorKey}`,
        JSON.stringify(json),
      );
      window.localStorage.setItem(
        `html-content-${editorKey}`,
        editor.getHTML(),
      );
      window.localStorage.setItem(
        `markdown-content-${editorKey}`,
        editor.storage.markdown.getMarkdown(),
      );
      setSaveStatus("Saved");
    },
    500,
  );

  useEffect(() => {
    if (local) {
      const data = localStorage.getItem(`novel-content-${editorKey}`);
      if (data) {
        setInitialContent(JSON.parse(data));
      }
    } else if (prevContent !== "") {
      setInitialContent(prevContent as JSONContent);
    } else {
      setInitialContent({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "",
              },
            ],
          },
        ],
      } as JSONContent);
    }
  }, [editorKey, local, prevContent]);

  if (!initialContent) return null;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
        {/* <div className="text-muted-foreground rounded-lg border border-black bg-company-yellow-100 px-2 py-1 text-sm">
          {saveStatus}
        </div> */}
        <div
          className={
            charsCount
              ? "text-muted-foreground rounded-lg border border-black bg-company-yellow-100 px-2 py-1 text-sm"
              : "hidden"
          }
        >
          {charsCount} Words
        </div>
        {/* {!local && <LocalDataButton />} */}
      </div>
      <EditorRoot>
        <EditorContent
          editable={editable}
          immediatelyRender={false}
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full rounded-sm border border-black bg-white p-4 shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                "prose prose-lg dark:prose-invert prose-headings:font-bold font-sans focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
            onChange(editor);
          }}
          slotAfter={<ImageResizer />}
        >
          <LocalDataLoader editorKey={editorKey} />
          <EditorCommand className="border-muted z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-white px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="text-muted-foreground px-2">
              No results
            </EditorCommandEmpty>
            <EditorCommandList className="font-sans">
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-black hover:text-white aria-selected:bg-black aria-selected:text-white"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-black bg-white text-black hover:bg-black hover:text-white aria-selected:bg-black aria-selected:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="cursor-default font-medium">{item.title}</p>
                    <p className="text-muted-foreground cursor-default text-xs">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default TailwindAdvancedEditor;
