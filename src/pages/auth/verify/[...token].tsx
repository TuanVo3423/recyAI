import { Verify } from '@/features';
import Head from 'next/head';

export default function VerifyPage() {
  return (
    <>
      <Head>
        <title>VerifyPage - AI.recycling.website</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>
      <Verify />
    </>
  );
}
