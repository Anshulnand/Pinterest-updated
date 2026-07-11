"use client"

import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from './../components/Pins/PinList'
import { useSearchParams } from 'next/navigation'
import Sidebar from './../components/Sidebar'

export const dynamic = 'force-dynamic'

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState<any[]>([]);
  const [filteredPins, setFilteredPins] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { data: session } = useSession();

  useEffect(() => {
    getAllPins();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPins(listOfPins);
    } else {
      const filtered = listOfPins.filter(pin => 
        pin.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.desc?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPins(filtered);
    }
  }, [searchQuery, listOfPins]);

  const getAllPins = async () => {
    const q = query(collection(db, 'pinterest-post'));
    const querySnapshot = await getDocs(q);

    const pins: any[] = [];

    querySnapshot.forEach((doc) => {
      pins.push(doc.data());
    });

    setListOfPins(pins);
  }

  return (
    <>
      <Sidebar />
      <div className="lg:ml-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="auth-buttons p-4 mb-4">
            {session ? (
              <div className="flex items-center gap-4">
                <button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition">Sign out</button>
                <p className="text-gray-600">Signed in as {session.user?.email}</p>
              </div>
            ) : (
              <button onClick={() => signIn()} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition">Sign in</button>
            )}
          </div>
          
          <div className="px-4 pb-8">
            <PinList listOfPins={filteredPins} />
          </div>
        </div>
      </div>
    </>
  )
}
