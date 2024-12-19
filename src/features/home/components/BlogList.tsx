"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";

const BlogList = () => {
  const [page, setPage] = useState<number>(1);

  const [search, setValue] = useState<string>("");

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({ page, search: debouncedValue });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isPending) {
    return <h1 className="mt-8 text-center">Loading...</h1>;
  }

  if (!data) {
    return <h1 className="mt-8 text-center">No data.</h1>;
  }

  return (
    <>
      <Input
        placeholder="Search"
        className="mx-auto my-8 max-w-3xl rounded-xl"
        onChange={(e) => setValue(e.target.value)}
        value={search}
      />
      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="mt-8 text-center">Loading...</h1>
        </div>
      )}

      {!data.data.length ? (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="mt-8 text-center">No data.</h1>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {data?.data.map((blog, index) => {
              return <BlogCard key={index} blog={blog} />;
            })}
          </div>
          <PaginationSection
            onChangePage={handlePageChange}
            page={page}
            take={data.meta.take}
            total={data.meta.total}
          />
        </>
      )}
    </>
  );
};

export default BlogList;
