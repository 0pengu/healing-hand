import { JSONContent } from "novel";
import { create } from "zustand";

type localDataStoreType = {
  localData: JSONContent | null;
  setLocalData: (data: JSONContent | null) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
  localDataToEditor: boolean;
  setLocalDataToEditor: (bool: boolean) => void;
};

export const useLocalDataStore = create<localDataStoreType>()((set) => ({
  localData: null,
  setLocalData: (data) => set({ localData: data }),
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
  localDataToEditor: false,
  setLocalDataToEditor: (localDataToEditor) => set({ localDataToEditor }),
}));
