import Feed from "@/components/Feed";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Login from "./Login";
import SignUp from "./SignUp";
import HomeInfo from "@/components/HomeInfo";

export default function Home() {
  return (
    <div>
          <HomeInfo/>
          {/* <Login/> */}
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide hidden">
      
            
            {/* // <SignUp/> */}
            <Head>
              <title>InstaEco</title>
              <link rel="icon" href="/falvicon.ico"/>
            </Head>

            {/*Header*/}
            <Header/>

            {/*Feed*/}
            <Feed/>
            {/*Modal*/}
          </div> 
    </div>
    
  )
}