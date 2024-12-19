import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card>
        <CardHeader>
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
            <Image
              src={blog.thumbnail}
              alt=""
              fill
              className="object-cover duration-100 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-sm bg-gray-300 text-gray-900"
            >
              {blog.category}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-sm bg-gray-100 text-gray-600"
            >
              {format(blog.createdAt, "dd MMMM yyyy")}
            </Badge>
          </div>
          <CardTitle>
            <h1 className="my-2 line-clamp-2 text-lg font-bold">
              {blog.title}
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="line-clamp-1">{blog.description}</p>
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
