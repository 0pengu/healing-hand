import Footer from "@/app/_components/footer/footer";
import BlogCard from "@/app/_components/header/components/blog-cards";
import { AuthorUser } from "@/app/editor/blog/new/types";
import { Button } from "@/components/ui/button";
import { DownArrow } from "@/components/ui/down-arrow";

const blogs: {
  imageUrl: string;
  title: string;
  author: AuthorUser[] | AuthorUser;
  content?: string;
  slug: string;
  buttonText?: string;
  editMode?: boolean;
}[] = [
  {
    imageUrl: "https://picsum.photos/id/19/2500/1667",
    title: "Giving back to Location X",
    author: [
      {
        id: "1",
        name: "Tan A",
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sadie",
        type: "TEAM",
        email: "fake@fake.com",
      },
      {
        id: "2",
        name: "Tah A",
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Apples",
        type: "TEAM",
        email: "fake@fake.com",
      },
    ],
    slug: "giving-back-to-location-x",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    buttonText: "Read More",
    editMode: false,
  },
  {
    imageUrl: "https://picsum.photos/id/27/3264/1836",
    title: "About Us",
    author: [
      {
        id: "3",
        name: "Ob C",
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Apples",
        email: "fake@fake.com",
        type: "TEAM",
      },
      {
        id: "1",
        name: "Tan A",
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sadie",
        type: "TEAM",
        email: "fake@fake.com",
      },
      {
        id: "2",
        name: "Tah A",
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Apples",
        type: "TEAM",
        email: "fake@fake.com",
      },
      {
        name: "Mi N",
        image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sanjeet",
        id: "4",
        type: "TEAM",
        email: "fake@fake.com",
      },
    ],
    slug: "about-us",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttonText: "Learn More",
    editMode: false,
  },
  {
    imageUrl: "https://picsum.photos/id/25/5000/3333",
    title: "Lorem Ipsum",
    author: {
      name: "Mi N",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sanjeet",
      id: "4",
      type: "TEAM",
      email: "fake@fake.com",
    },
    slug: "lorem-ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttonText: "Discover",
    editMode: false,
  },
];

export default async function Home() {
  // Simulate loading time in development mode
  if (process.env.NODE_ENV === "development")
    await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <DownArrow />
      <div className="relative flex h-screen-no-header w-full items-center bg-gray-100">
        <video
          src="/landing-video/fake.mp4"
          autoPlay
          playsInline
          muted
          loop
          className="h-full w-full bg-yellow-50 object-cover"
        />
        <div className="absolute left-1/2 top-1/2 flex min-h-fit w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded border border-black bg-yellow-50 px-4 py-2 text-center shadow-lg sm:left-[15%] sm:top-auto sm:w-1/4 sm:transform-none">
          <h1 className="text-2xl font-bold text-gray-800">Hi! 👋</h1>
          <div className="font-sans">
            <p className="text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-800">
              <li>Ut enim ad minim veniam</li>
              <li>Quis nostrud exercitation ullamco</li>
              <li>Laboris nisi ut aliquip ex ea commodo consequat</li>
            </ul>
          </div>
          <Button className="mt-4 w-full">Learn More</Button>
        </div>
      </div>
      <div className="flex h-[50vh] w-full flex-col items-center justify-center border border-b-0 border-black">
        <h2 className="text-2xl font-bold text-gray-800">
          What are we trying to do?
        </h2>
        <p className="px-1 text-center text-gray-800 md:px-0 md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex w-full flex-col items-center border border-black bg-yellow-200 p-4">
        <h2 className="pb-8 text-2xl font-bold text-gray-800">
          Take a look at some of our blogs
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard {...blog} key={index} />
          ))}
        </div>
      </div>
      <div className="flex h-[50vh] w-full flex-col items-center justify-center border border-t-0 border-black bg-sky-200">
        <h2 className="text-2xl font-bold text-gray-800">How can you help?</h2>
        <p className="px-1 text-center text-gray-800 md:px-0 md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <Footer />
    </>
  );
}
