"use client";
import React, { useEffect, useState } from "react";
import PinImage from "../../../components/PinDetail/PinImage";
import PinInfo from "../../../components/PinDetail/PinInfo";
import Sidebar from "../../../components/Sidebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../../Shared/firebaseConfig";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

function PinDetail({ params }) {
  const router = useRouter();
  const db = getFirestore(app);
  const unwrappedParams = React.use(params);  // <-- Unwrap params here
  const pinId = unwrappedParams.pinId;

  const [pinDetail, setPinDetail] = useState(null);

  useEffect(() => {
    if (!pinId) return; // Guard clause
    getPinDetail();
  }, [pinId]);

  const getPinDetail = async () => {
    const docRef = doc(db, "pinterest-post", pinId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPinDetail(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  return (
    <>
      <Sidebar />
      {pinDetail ? (
        <div className="lg:ml-20 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <HiArrowSmallLeft
              className="text-4xl font-bold cursor-pointer hover:bg-gray-200 rounded-full p-2 mb-4"
              onClick={() => router.back()}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex justify-center items-start">
                <PinImage pinDetail={pinDetail} />
              </div>
              <div className="flex flex-col">
                <PinInfo pinDetail={pinDetail} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PinDetail;
