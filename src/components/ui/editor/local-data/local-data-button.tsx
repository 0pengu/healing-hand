import { useLocalDataStore } from "@/components/ui/editor/local-data/store";
import { Check } from "lucide-react";

export default function LocalDataButton() {
  const localLoaded = useLocalDataStore((state) => state.loaded);
  const setLocalLoaded = useLocalDataStore((state) => state.setLoaded);
  const setLocalDataToEditor = useLocalDataStore(
    (state) => state.setLocalDataToEditor,
  );
  return (
    <div
      className={
        !localLoaded
          ? "text-muted-foreground cursor-pointer rounded-lg border border-black bg-company-blue-300 px-2 py-1 text-sm"
          : "hidden"
      }
      onClick={() => {
        setLocalDataToEditor(true);
        setLocalLoaded(true);
      }}
    >
      {localLoaded ? (
        <Check className="text-green-500" />
      ) : (
        "Local Data found. Click to load."
      )}
    </div>
  );
}
