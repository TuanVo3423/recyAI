import { VerifyEmail } from '@/features';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function VerifyEmailPage() {
  return (
    <>
      <Head>
        <title>VerifyEmailPage - AI.recycling.website</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>
        <VerifyEmail />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ['common'])),
      // Will be passed to the page component as props
    },
  };
};
