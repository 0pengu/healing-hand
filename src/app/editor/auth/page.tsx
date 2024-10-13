import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login to the editor</CardTitle>
          <CardDescription>
            In the wrong place? Click{" "}
            <Button asChild variant="link" className="px-[-2px]">
              <Link href="/">here</Link>
            </Button>{" "}
            to go back to the main page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="secondary">
            <FaGoogle className="mx-2" />
            Login with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-gray-600">
          This page is only meant to be used by the Healing Hand team. You need
          authorization in order to access the editor.
        </CardFooter>
      </Card>
    </div>
  );
}
