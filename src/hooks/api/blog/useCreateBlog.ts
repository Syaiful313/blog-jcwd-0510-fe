"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface CreateBlogPayload {
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: File | null;
}

const useCreateBlog = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      const createBlogForm = new FormData();

      createBlogForm.append("title", payload.title);
      createBlogForm.append("category", payload.category);
      createBlogForm.append("description", payload.description);
      createBlogForm.append("content", payload.content);
      createBlogForm.append("thumbnail", payload.thumbnail!);

      const { data } = await axiosInstance.post("/blogs", createBlogForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create blog success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateBlog;
