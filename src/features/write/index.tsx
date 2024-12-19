"use client";

import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const WritePage = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    setSelectedImage("");
    formik.setFieldValue("thumbnail", null);
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };
  return (
    <main className="container mx-auto max-w-5xl px-4">
      <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.title && !!formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            name="category"
            placeholder="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.category && !!formik.errors.category && (
            <div className="text-red-500">{formik.errors.category}</div>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
            style={{ resize: "none" }}
          />
          {!!formik.touched.description && !!formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>
        <RichTextEditor
          label="Content"
          value={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          isError={!!formik.errors.content}
        />

        {selectedImage && (
          <>
            <div className="relative h-[200px] w-[300px]">
              <Image
                src={selectedImage}
                alt="thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <Button
              type="button"
              variant={"destructive"}
              onClick={removeThumbnail}
            >
              Remove
            </Button>
          </>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label>Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="my-10" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default WritePage;
