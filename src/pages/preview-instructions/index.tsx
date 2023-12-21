import { PreviewInstructions } from '@/features';
import { LayoutInstructions } from '@/layouts';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function PreviewInstructionsPage() {
  return (
    <>
      <Head>
        <title>PreviewInstructionsPage - AI.recycling.website</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>

      <LayoutInstructions page="Create instructions">
        <PreviewInstructions />
      </LayoutInstructions>
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
