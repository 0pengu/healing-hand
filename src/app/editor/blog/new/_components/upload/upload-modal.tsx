import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function UploadModal({
  onSuccess = (url) => console.log(url),
}: {
  onSuccess?: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const promise = fetch("/api/upload", {
      method: "POST",
      headers: {
        "content-type": file?.type || "application/octet-stream",
        "x-vercel-filename": file?.name || "image.png",
      },
      body: file,
    });

    toast.promise(promise, {
      loading: "Uploading image...",
      success: "Image uploaded successfully.",
      error: (e) => {
        throw new Error(e.message);
      },
    });

    const res = await promise;

    if (res.ok) {
      const { url } = await res.json();
      onSuccess(url);
      setOpen(false);
    }
  };

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/*": [
        ".jpeg",
        ".jpg",
        ".png",
        ".gif",
        ".bmp",
        ".tiff",
        ".svg",
        ".webp",
        ".ico",
      ],
    },
    maxFiles: 1,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="tertiary" type="button">
          <UploadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        <DialogHeader>Upload Image</DialogHeader>
        <DialogTitle>
          Drag and drop your image here or click to upload
        </DialogTitle>
        <div
          className="border-gray flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="text-gray-500">
            {isDragAccept && <p>The file will be accepted</p>}
            {isDragReject && <p>Some files will be rejected</p>}
            {!isDragActive && <p>Drop a file here or click...</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
