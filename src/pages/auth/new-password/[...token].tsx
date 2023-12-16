import { NewPassword } from '@/features';
import Head from 'next/head';

export default function NewPasswordPage() {
  return (
    <>
      <Head>
        <title>NewPasswordPage - AI.recycling.website</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>
      <NewPassword />
    </>
  );
}
