import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-[91vh] relative flex items-center bg-gray-100">
      <video
        src="/landing-video/fake.mp4"
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <div className="absolute left-[15%] bg-yellow-50 px-4 py-2 rounded shadow-lg w-1/4 min-h-fit flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-800">Hi! 👋</h1>
        <div className="font-sans">
          <p className="text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="list-disc list-inside text-gray-800 mt-4">
            <li>Ut enim ad minim veniam</li>
            <li>Quis nostrud exercitation ullamco</li>
            <li>Laboris nisi ut aliquip ex ea commodo consequat</li>
          </ul>
        </div>
        <Button className="w-full mt-4">Some fun facts about us!</Button>
      </div>
    </div>
  );
}
