import { useLocalDataStore } from "@/components/ui/editor/local-data/store";
import { useRouter } from "next/navigation";
import { useEditor } from "novel";
import { useEffect } from "react";

export default function LocalDataLoader({
  editorKey,
}: {
  editorKey: string[];
}) {
  const router = useRouter();
  const { editor } = useEditor();
  const setLocalData = useLocalDataStore((state) => state.setLocalData);
  const localDataToEditor = useLocalDataStore(
    (state) => state.localDataToEditor,
  );

  useEffect(() => {
    const data = localStorage.getItem(`novel-content-${editorKey}`);
    if (data) {
      const da = JSON.parse(data);
      setLocalData(da);
    }
  }, [editorKey, setLocalData]);

  useEffect(() => {
    if (localDataToEditor && editor) {
      // router.push("/editor/blog/new?local=true");
      // router.refresh();
      window.location.href = "/editor/blog/new?local=true";
    }
  }, [localDataToEditor, editor, editorKey, router]);

  if (!editor) return null;

  return <></>;
}
