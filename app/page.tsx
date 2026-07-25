"use client"

import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query, doc, updateDoc } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState, Suspense } from 'react';
import PinList from './../components/Pins/PinList'
import { useSearchParams } from 'next/navigation'
import Sidebar from './../components/Sidebar'

const CATEGORIES = [
  "All",
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

const DEFAULT_CATEGORIES = ["Wallpapers", "Design", "Photography", "Technology", "Art", "Nature", "Architecture", "Fashion", "Food"];

const inferCategory = (title = '', desc = '', index = 0) => {
  const text = (title + " " + desc).toLowerCase();
  if (text.includes("wallpaper") || text.includes("background")) return "Wallpapers";
  if (text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("graphic")) return "Design";
  if (text.includes("photo") || text.includes("camera") || text.includes("portrait") || text.includes("shot")) return "Photography";
  if (text.includes("tech") || text.includes("code") || text.includes("laptop") || text.includes("horizon") || text.includes("game")) return "Technology";
  if (text.includes("art") || text.includes("paint") || text.includes("draw") || text.includes("sketch")) return "Art";
  if (text.includes("nature") || text.includes("tree") || text.includes("sky") || text.includes("mountain") || text.includes("flower")) return "Nature";
  if (text.includes("arch") || text.includes("building") || text.includes("house")) return "Architecture";
  if (text.includes("fashion") || text.includes("style") || text.includes("wear")) return "Fashion";
  if (text.includes("food") || text.includes("dish") || text.includes("recipe") || text.includes("cake")) return "Food";
  
  return DEFAULT_CATEGORIES[index % DEFAULT_CATEGORIES.length];
};

function HomeContent() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState<any[]>([]);
  const [filteredPins, setFilteredPins] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { data: session } = useSession();

  useEffect(() => {
    getAllPins();
  }, []);

  useEffect(() => {
    let result = listOfPins;

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter(pin => 
        pin.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(pin => 
        pin.title?.toLowerCase().includes(q) ||
        pin.desc?.toLowerCase().includes(q) ||
        pin.category?.toLowerCase().includes(q)
      );
    }

    setFilteredPins(result);
  }, [searchQuery, selectedCategory, listOfPins]);

  const getAllPins = async () => {
    const q = query(collection(db, 'pinterest-post'));
    const querySnapshot = await getDocs(q);

    const pins: any[] = [];
    let index = 0;

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      if (!data.category) {
        const assignedCat = inferCategory(data.title, data.desc, index);
        data.category = assignedCat;
        try {
          await updateDoc(doc(db, 'pinterest-post', docSnap.id), { category: assignedCat });
        } catch (err) {
          console.warn("Auto category update warning:", err);
        }
      }
      pins.push(data);
      index++;
    }

    setListOfPins(pins);
  }

  return (
    <>
      <Sidebar />
      <div className="lg:ml-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4 mb-2 border-b border-gray-100 flex-wrap gap-4">
            {/* Category Pills Filter */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar max-w-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="auth-buttons shrink-0">
              {session ? (
                <div className="flex items-center gap-4">
                  <button onClick={() => signOut()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition cursor-pointer">Sign out</button>
                  <p className="text-gray-600 text-sm hidden md:block">Signed in as {session.user?.email}</p>
                </div>
              ) : (
                <button onClick={() => signIn()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition cursor-pointer">Sign in</button>
              )}
            </div>
          </div>
          
          <div className="pb-8">
            <PinList listOfPins={filteredPins} />
          </div>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="lg:ml-20 bg-white min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
