'use client';

import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function ButtonsProviders() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => signIn('google')}
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-3 flex items-center gap-2"
        >
          <FaGoogle />
          <span>Se connecter avec Google</span>
        </button>
        <button
          onClick={() => signIn('github')}
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-3 flex items-center gap-2"
        >
          <FaGithub />
          <span>Se connecter avec Github</span>
        </button>
      </div>
    </>
  );
}
