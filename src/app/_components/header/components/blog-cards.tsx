"use client";

import { AuthorUser } from "@/app/editor/blog/new/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function BlogCard({
  imageUrl = "/placeholder.svg?height=200&width=400",
  title = "Understanding React Hooks",
  author,
  content = "React Hooks are a powerful feature that allow you to use state and other React features without writing a class. They let you 'hook into' React state and lifecycle features from function components...",
  slug = "understanding-react-hooks",
  buttonText = "Read More",
  editMode = false,
  tags,
}: {
  imageUrl: string;
  title: string;
  author: AuthorUser[] | AuthorUser;
  content?: string;
  slug: string;
  buttonText?: string;
  editMode?: boolean;
  tags: string[];
}) {
  const truncatedContent =
    content && content.length > 180
      ? content.substring(0, 180) + "..."
      : content || "No content available.";

  // Check if author is an array of authors or a single author
  const isMultipleAuthors = Array.isArray(author);

  const ref = useRef(null);
  const isInDom = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInDom ? "visible" : "hidden"}
      variants={{
        hidden: {
          filter: "blur(4px)",
          y: 20,
        },
        visible: {
          filter: "blur(0px)",
          y: 0,
          transition: {
            duration: 1,
          },
        },
      }}
      className="z-0 mx-auto flex max-w-sm flex-col overflow-hidden rounded-xl border border-black bg-yellow-50 text-zinc-50"
    >
      <div className="relative h-52 w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="flex-grow p-4">
        <h2 className="mb-2 line-clamp-2 text-xl font-bold text-black">
          {title}
        </h2>
        <div className="mb-3 flex items-center">
          {/* Render multiple author badges if there are multiple authors */}
          {isMultipleAuthors ? (
            <div className="flex -space-x-3">
              {author.map((auth, idx) => (
                <Avatar className="h-6 w-6 border bg-white" key={idx}>
                  {auth.image ? (
                    <AvatarImage src={auth.image} alt={auth.name ?? ""} />
                  ) : (
                    <AvatarFallback>{auth.name?.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              ))}
            </div>
          ) : (
            // Render a single author badge if there is only one author
            <Avatar className="h-6 w-6 border bg-white">
              {author.image ? (
                <AvatarImage src={author.image} alt={author.name ?? ""} />
              ) : (
                <AvatarFallback>{author.id.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
          )}
          {/* Show author names and handle truncation for multiple authors */}
          <span className="pl-2 text-sm text-gray-600">
            {isMultipleAuthors
              ? author
                  .map((auth) => auth.name)
                  .join(", ")
                  .substring(0, 30) +
                (author.map((auth) => auth.name).join(", ").length > 30
                  ? "..."
                  : "")
              : author.name}
          </span>
        </div>
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className="cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <p className="mb-4 line-clamp-3 font-sans text-sm text-gray-700">
          {truncatedContent}
        </p>
      </CardContent>
      {/* Add mt-auto to push the footer to the bottom */}
      <CardFooter className="mt-auto p-4 pt-0">
        <Button asChild size="sm" className="w-full">
          <Link href={editMode ? `/editor/blog/${slug}` : `/blog/${slug}`}>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </motion.div>
  );
}
