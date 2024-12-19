"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAxios from "../useAxios";

export const useDeleteBlog = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/blogs/${id}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Delete blog success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.replace("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};