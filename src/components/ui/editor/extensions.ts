import {
  AIHighlight,
  CharacterCount,
  CodeBlockLowlight,
  Color,
  CustomKeymap,
  GlobalDragHandle,
  HighlightExtension,
  HorizontalRule,
  MarkdownExtension,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapLink,
  TiptapUnderline,
  Twitter,
  UpdatedImage,
  Youtube,
  Mathematics,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";

import { cva } from "class-variance-authority";
import { common, createLowlight } from "lowlight";

//TODO I am using cva here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cva(
      "text-muted-foreground hover:text-primary cursor-pointer underline underline-offset-[3px] transition-colors",
    )(),
  },
});

const updatedImage = UpdatedImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cva("rounded-lg border border-stone-200 opacity-40")(),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cva("border-muted rounded-lg border")(),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cva("not-prose pl-2")(),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cva("my-4 flex items-start gap-2")(),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cva("border-muted-foreground mb-6 mt-4 border-t")(),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cva("-mt-2 list-outside list-disc leading-3")(),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cva("-mt-2 list-outside list-decimal leading-3")(),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cva("-mb-2 leading-normal")(),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cva("border-primary border-l-4")(),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cva("bg-muted rounded-md px-1.5 py-1 font-mono font-medium")(),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const codeBlockLowlight = CodeBlockLowlight.configure({
  // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
  // common: covers 37 language grammars which should be good enough in most cases
  lowlight: createLowlight(common),
  HTMLAttributes: {
    class: cva(
      "bg-muted text-muted-foreground rounded-md border p-5 font-mono font-medium",
    )(),
  },
});

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cva("border-muted rounded-lg border")(),
  },
  inline: false,
});

const twitter = Twitter.configure({
  HTMLAttributes: {
    class: cva("not-prose")(),
  },
  inline: false,
});

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cva("cursor-pointer rounded p-1 text-foreground hover:bg-white")(),
  },
  katexOptions: {
    throwOnError: false,
  },
});

const characterCount = CharacterCount.configure();

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlockLowlight,
  youtube,
  twitter,
  mathematics,
  characterCount,
  TiptapUnderline,
  MarkdownExtension,
  HighlightExtension,
  TextStyle,
  Color,
  CustomKeymap,
  GlobalDragHandle,
];
