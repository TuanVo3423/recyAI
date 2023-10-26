// import Image from 'next/legacy/image'
import Image from 'next/image'
import React from 'react'
import {SearchIcon,PlusCircleIcon,UserGroupIcon,HeartIcon,PaperAirplaneIcon,MenuIcon} from "@heroicons/react/outline";
import {HomeIcon} from '@heroicons/react/solid'

function Header() {
  return (
    <div className='shadow-lg border-b bg-white h-[101px] sticky top-0 z-50'> 
        <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto pt-4'>

            <div className='relative hidden lg:inline-grid w-36 '>
            <Image 
                src="https://links.papareact.com/ocw" 
                fill 
                style={{objectFit:"contain"}}/>

            </div>
            <div className='relative w-24 lg:hidden flex-shrink-0'>
            <Image
                src="https://links.papareact.com/jjm" 
                fill 
                style={{objectFit:"contain"}}/>

            </div>


        <div className='max-w-xs'>
            <div className='relative p-3 rounded-md ' >
                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className="h-5 w-5 text-gray-500"/>
                </div>
                <input className="bg-gray-50 block w-full pl-10 lg:text-lg sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" type="text" placeholder='Search'/>
            </div>
        </div>
                
        <div className='flex items-center justify-end space-x-4 '>
            <HomeIcon className='navBtn h-8 w-8'/>
            <MenuIcon className='h-6 md:hidden cursor-pointer'/>
            <div className='relative navBtn -top-[10px]'>
                <PaperAirplaneIcon className="navBtn h-8 w-8 rotate-45"/>
                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse'>
                    3
                </div>
            </div>
            
            <PlusCircleIcon className='navBtn h-8 w-8' />
            <UserGroupIcon className='navBtn h-8 w-8'/>
            <HeartIcon className='navBtn h-8 w-8'/>

            <img src='https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg' alt='profile-pic'
            className='h-14 w-14 rounded-full cursor-pointer'/>
        </div>
        

        </div>
    </div>
  )
}

export default Header