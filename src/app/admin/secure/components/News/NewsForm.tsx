import React, { useState, useRef } from "react";
import {NewsFeed} from "@prisma/client";


// Define custom form data type
interface NewsFormData {
    title: string;
    summary: string;
    content: string;
    image: File | string;
    imagePreview: string;

}

// Props for the form
interface NewsFormProps {
    onSubmit: (formData: FormData) => void;
    initialData?: NewsFeed | null;
}

// Utility function to convert NewsFeed to NewsFormData
const convertInitialDataToFormData = (data: NewsFeed | null): NewsFormData => ({
    title: data?.title || "",
    summary: data?.summary || "",
    content: "", // Since `content` doesn't exist in NewsFeed, default to empty
    image: data?.images || "",
    imagePreview: typeof data?.images === "string" ? data.images : "",

});

export const NewsForm: React.FC<NewsFormProps> = ({ onSubmit, initialData }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<NewsFormData>(
        convertInitialDataToFormData(initialData || null)
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed.");
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                alert("Image must be under 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: "",
            imagePreview: "",
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("summary", formData.summary);

        form.append("content", formData.content);
        if (formData.image) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            form.append("image", formData.image instanceof File ? formData.image : "", formData.image instanceof File ? formData.image.name : ""); // Handling image file correctly
        }

        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
                <input
                    id="summary"
                    type="text"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              {/*  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as NewsFeedStatus })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>*/}
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500"
                />
                {formData.imagePreview && (
                    <div className="mt-2 flex items-center space-x-2">
                        <img src={formData.imagePreview} alt="Preview" className="h-16 w-16 object-cover" />
                        <button type="button" onClick={handleRemoveImage} className="text-red-600">

                        </button>
                    </div>
                )}
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => setFormData(convertInitialDataToFormData(null))}
                    className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md"
                >
                    Clear
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    {initialData ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
};
