import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import prisma from '@/prisma';
import { connectToDatabase } from '@/helpers/server-helpers';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
    await connectToDatabase();
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    }
  });

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
