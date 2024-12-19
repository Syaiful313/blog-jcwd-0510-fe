import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBlog = () => {
  return (
    <main className="container mx-auto mt-20 max-w-5xl px-4">
      <section className="space-y-2">
        <Skeleton className="h-[22px] w-[10%] rounded-sm" />
        <Skeleton className="h-[40px] w-[40%] rounded-sm" />
        <Skeleton className="h-[22px] w-[15%] rounded-sm" />
        <Skeleton className="h-[300px] w-[100%] rounded-sm md:h-[500px]" />
      </section>
    </main>
  );
};

export default SkeletonBlog;
