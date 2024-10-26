import { FaSpinner } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center">
      <FaSpinner className="animate-spin text-4xl text-blue-400" />
    </div>
  );
}
