import { collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '@/app/db/firebaseConfig';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCollection = collection(db, 'users');
    const userRef = await addDoc(userCollection, {
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: 'User created', userId: userRef.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
