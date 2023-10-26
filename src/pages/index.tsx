import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Head from 'next/head';
import HomeInfo from '@/components/HomeInfo';

export default function Home() {
  return (
    <div>
      <HomeInfo />
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide hidden">
        <Head>
          <title>InstaEco</title>
          <link rel="icon" href="/falvicon.ico" />
        </Head>
        <Header />
        <Feed />
      </div>
    </div>
  );
}
