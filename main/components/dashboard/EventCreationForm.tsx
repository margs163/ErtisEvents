"use client";

import type React from "react";

import { useRef, useState, useTransition } from "react";
import {
  Calendar,
  Clock,
  FileText,
  Bookmark,
  ImageIcon,
  X,
  DollarSign,
} from "lucide-react";
import { interestTags, interestTagIcons } from "@/lib/constants";
import { EventType } from "@/lib/types";
import { generateImage, handleFormSubmission } from "@/lib/actions";
import { useEventsStore } from "@/lib/eventStore";
import { toast } from "sonner";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function EventCreationForm() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    date: new Date(),
    availableSeats: 0,
    tags: [] as string[],
    category: "",
    imageFile: null as File | null,
    imagePreview: "" as string,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const addEvent = useEventsStore((state) => state.addEvent);
  const generatedImage = useRef<HTMLImageElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await handleFormSubmission(formData);
    if (data?.error) {
      toast.error("Could not create an event", {
        description: "Please try again later",
      });
      console.log(data?.error);
    }

    if (data?.data) {
      addEvent({ ...data.data, s3Url: null });
      toast.success("Successfully created an event", {
        description: "Your event is created",
      });
      router.replace("/search");
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      date: new Date(),
      category: "",
      availableSeats: 0,
      tags: [],
      imageFile: null,
      imagePreview: "",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
  };
  const handleGenerateImage = async () => {
    return;
    // startTransition(async () => {
    //   try {
    //     // const blob = await generateImage("A poster for a city event"); // Blob from HF
    //     const file = new File([blob], "generated.png", { type: "image/png" });
    //     const url = URL.createObjectURL(blob);
    //     setFormData((prev) => ({
    //       ...prev,
    //       imageFile: file,
    //       imagePreview: url,
    //     }));
    //   } catch (err) {
    //     console.error(err);
    //     toast.error("Failed to generate image");
    //   }
    // });
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-2xl lg:max-w-7xl mx-auto lg:mx-auto">
        <h1 className="text-xl lg:text-4xl font-bold mb-1">
          Создать Мероприятие
        </h1>
        <h3 className="text-sm lg:text-xl font-medium text-neutral-600 mb-8 lg:mb-10">
          Создайте свое мероприятие для жителей города
        </h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-20 lg:w-full"
        >
          <div className="space-y-4 lg:space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                Title<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Bookmark
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Event title"
                  className="w-full pl-10 pr-4 py-3 text-xs lg:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                Category<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Bookmark
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Event category"
                  className="w-full pl-10 pr-4 py-3 text-xs lg:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Bookmark
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Event short description"
                  className="w-full text-xs lg:text-sm pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event description"
                rows={4}
                className="w-full px-4 py-3 text-xs lg:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition resize-none"
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date.toString()}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 text-xs lg:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats
                </label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-white border text-xs lg:text-sm border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
                Event Image
              </label>
              <div className="mb-8">
                {formData.imagePreview ? (
                  <div className="relative">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-60 lg:h-80 object-scale-down rounded-lg lg:rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center border-2 border-dashed rounded-lg p-8 bg-blue-50 cursor-pointer hover:bg-blue-100 transition">
                    <div className="text-center">
                      <ImageIcon
                        className="mx-auto text-blue-500 mb-2"
                        size={32}
                      />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
                <button
                  type="button"
                  onClick={handleGenerateImage}
                  className="mt-4 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs lg:text-sm font-medium lg:font-semibold  rounded-lg transition"
                >
                  {isPending ? "Generating..." : "Generate using AI"}
                </button>
              </div>
            </div>

            {/* Tags Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Event Tags
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {interestTags.map((tag) => {
                  const IconComponent = interestTagIcons[tag];
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition ${
                        formData.tags.includes(tag)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {IconComponent && (
                        <IconComponent className="size-4 shrink-0" />
                      )}
                      <span
                        className={
                          formData.tags.includes(tag)
                            ? "text-blue-600 font-medium text-sm"
                            : "text-gray-700 text-sm"
                        }
                      >
                        {tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex lg:grid lg:grid-cols-[0.4fr_0.4fr_0.2fr] gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-xs rounded-lg transition flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                Create Event
              </button>
              <button className="w-full hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-xs rounded-lg transition items-center justify-center gap-2">
                <DollarSign size={20} />
                Advertise the Event
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 bg-gray-200 text-xs hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                Reset
              </button>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-xs rounded-lg transition flex items-center lg:hidden justify-center gap-2">
              <DollarSign size={20} />
              Advertise the Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
