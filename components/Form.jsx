"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UserTag from "./UserTag";
import app from "./../app/Shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Form() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("Wallpapers");

  const CATEGORIES = [
    "Wallpapers",
    "Design",
    "Photography",
    "Technology",
    "Art",
    "Nature",
    "Architecture",
    "Fashion",
    "Food",
    "Other"
  ];

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postId = Date.now().toString();

  const compressImage = (imageFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 800;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve("https://picsum.photos/seed/" + Date.now() + "/800/1000");
      };
      reader.onerror = () => resolve("https://picsum.photos/seed/" + Date.now() + "/800/1000");
    });
  };

  const onSave = async () => {
    if (!title.trim()) {
      alert("Please add a title for your post.");
      return;
    }
    if (!file) {
      alert("Please select an image file to upload.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      // Try uploading to Firebase Storage
      try {
        const storageRef = ref(storage, "VisionGrid/" + Date.now() + "-" + file.name);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      } catch (storageErr) {
        console.warn("Firebase Storage upload failed, compressing image to lightweight Base64 data URL fallback:", storageErr);
        imageUrl = await compressImage(file);
      }

      const postData = {
        title: title,
        desc: desc,
        link: link,
        image: imageUrl,
        category: category || "Wallpapers",
        userName: user?.fullName || user?.firstName || "Anonymous",
        email: user?.primaryEmailAddress?.emailAddress || "anonymous@visiongrid.com",
        userImage: user?.imageUrl || "/default-avatar.png",
        id: postId,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "pinterest-post", postId), postData);
      console.log("Post published successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to publish post:", error);
      alert("Error publishing post: " + (error?.message || "Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Create Post</h1>
        <button
          onClick={() => onSave()}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-2 rounded-full transition cursor-pointer flex items-center gap-2"
        >
          {loading ? (
            <>
              <Image
                src="/loading-indicator.png"
                width={18}
                height={18}
                alt="loading"
                className="animate-spin"
              />
              <span>Publishing...</span>
            </>
          ) : (
            <span>Publish</span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <UploadImage setFile={(file) => setFile(file)} />

        <div className="flex flex-col">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Add your title"
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold w-full outline-none placeholder-gray-400 border-b-2 border-gray-200 focus:border-gray-400 pb-2"
            />
            <p className="text-xs text-gray-400 mt-2">
              The first 40 characters are what usually show up in feeds
            </p>
          </div>
          
          <div className="mb-6">
            <UserTag user={{ name: user?.fullName || user?.firstName, email: user?.primaryEmailAddress?.emailAddress, image: user?.imageUrl }} />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-xl p-3 text-sm font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell everyone what your post is about"
              className="w-full outline-none text-sm placeholder-gray-400 border-b-2 border-gray-200 focus:border-gray-400 pb-2 resize-none h-24"
            />
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Add a destination link"
              className="w-full outline-none text-sm placeholder-gray-400 border-b-2 border-gray-200 focus:border-gray-400 pb-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
