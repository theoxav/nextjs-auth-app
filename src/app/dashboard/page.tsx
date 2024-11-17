'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { IoIosLogOut } from 'react-icons/io';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-5">
          {session.user?.image && (
            <Image
              src={session.user?.image as string}
              width={100}
              height={100}
              alt={session.user?.name as string}
              className="rounded-full"
            />
          )}
          <h1 className="text-4xl text-gray-700 uppercase font-black">
            Bienvenue <b>{session.user?.name}</b>
          </h1>
          <p>
            <b>Email: </b>
            {session.user?.email}
          </p>
          <button
            onClick={() => signOut()}
            className="bg-gray-200 hover:bg-gray-300 rounded-md p-3 flex items-center gap-2"
          >
            <IoIosLogOut />
            <span>Se déconnecter</span>
          </button>
        </div>
      ) : (
        router.push('/login')
      )}
    </>
  );
}
