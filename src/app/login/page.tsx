'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ButtonsProviders from '@/components/ButtonsProviders';
import FormLogin from '@/components/FormLogin';

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-8">
      <h1 className="text-4xl text-gray-700 uppercase font-black">Connexion</h1>
      <FormLogin />
      <ButtonsProviders />
    </div>
  );
}
