import { User } from '@/features';
import { MainLayout } from '@/layouts';
import Head from 'next/head';

export default function UserPage() {
  return (
    <>
      <Head>
        <title>UserPage - AI.recycling.website</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>
      <MainLayout>
        <User />
      </MainLayout>
    </>
  );
}
