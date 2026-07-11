"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UserTag from "./UserTag";
import app from "./../app/Shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Form() {
  const { data: session } = useSession();
 const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [link, setLink] = useState("");

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postId = Date.now().toString();
 const onSave = () => {
  console.log("Title", title, "link", link, "Desc", desc);
  console.log("File", file);
  uploadFile(); // Add this line
};

  const uploadFile = () => {
    const storageRef = ref(storage, "Pinterest2/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log("DownloadUrl", url);
          const postData = {
            title: title,
            desc: desc,
            link: link,
            image: url,
            userName: session.user.name,
            email: session.user.email,
            userImage: session.user.image,
            id: postId,
          };

          await setDoc(doc(db, "pinterest-post", postId), postData).then(
            (resp) => {
              console.log("Saved");
              setLoading(true);
              router.push("/" + session.user.email);
            }
          );
        });
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Create Pin</h1>
        <button
          onClick={() => onSave()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          {loading ? (
            <Image
              src="/loading-indicator.png"
              width={20}
              height={20}
              alt="loading"
              className="animate-spin"
            />
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
            <UserTag user={session?.user} />
          </div>
          
          <div className="mb-6">
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell everyone what your pin is about"
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
