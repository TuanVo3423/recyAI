// import Image from 'next/legacy/image'
import Image from 'next/image'
import React from 'react'
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from "@heroicons/react/outline";
import { HomeIcon, ChatIcon } from '@heroicons/react/solid'

function HomeInfo() {
    return (

        <div className='mb-10'>
            <div className='shadow-lg border-b bg-white h-[101px] sticky top-0 z-50'>
                <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto pt-4'>

                    <div className='relative hidden lg:inline-grid w-36 '>
                        <Image
                            src="https://links.papareact.com/ocw"
                            fill
                            style={{ objectFit: "contain" }} />

                    </div>
                    <div className='relative w-24 lg:hidden flex-shrink-0'>
                        <Image
                            src="https://links.papareact.com/jjm"
                            fill
                            style={{ objectFit: "contain" }} />

                    </div>


                    <div className='max-w-xs'>
                        <div className='relative p-3 rounded-md ' >
                            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                <SearchIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input className="bg-gray-50 block w-full pl-10 lg:text-lg sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" type="text" placeholder='Search' />
                        </div>
                    </div>

                    <div className='flex items-center justify-end space-x-4 '>
                        <HomeIcon className='navBtn h-8 w-8' />
                        <MenuIcon className='h-6 md:hidden cursor-pointer' />
                        <div className='relative navBtn -top-[10px]'>
                            <PaperAirplaneIcon className="navBtn h-8 w-8 rotate-45" />
                            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse'>
                                3
                            </div>
                        </div>

                        <PlusCircleIcon className='navBtn h-8 w-8' />
                        <UserGroupIcon className='navBtn h-8 w-8' />
                        <HeartIcon className='navBtn h-8 w-8' />

                        <img src='https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg' alt='profile-pic'
                            className='h-14 w-14 rounded-full cursor-pointer' />
                    </div>


                </div>
            </div>
            <div className='flex items-center justify-center space-x-44 mt-16'>
                <div>
                    <img src='https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg'
                        alt=""
                        className='rounded-full border p-[2px] hidden lg:block w-52'
                    />
                </div>
                <div className='-mt-5'>
                    <div className='flex items-center justify-center space-x-3'>
                        <p className='mt-3 mr-32 text-2xl lg:text-2xl'>PuPu</p>
                        <button className="bg-gray-200 hover:bg-gray-400 text-black w-[300px] h-[45px] ml-[75px] rounded-xl text-xl font-semibold mt-2">
                            Chinh sua trang ca nhan
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-400 text-black w-[210px] h-[45px] ml-[75px] rounded-xl text-xl font-semibold mt-2">
                            Xem kho luu tru
                        </button>
                    </div>
                    <div className='flex justify-center items-center text-2xl my-8 space-x-40'>
                        <p><span className='font-bold'>9</span> Post</p>
                        <p><span className='font-bold'>100</span> Followers</p>
                        <p><span className='font-bold'>100</span> Followings</p>
                    </div>
                    <div className='text-xl font-semibold mb-5'>Ha Canh Hong Phuc</div>
                    <div className='text-xl'>Tieu su ban than</div>
                </div>

            </div>
            <div className='flex justify-center items-center    '>
                <div className='flex items-center justify-center space-x-14 h-[280px] w-[766px] p-6 bg-transparent mt-2 border-none rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
                    <div>
                        <img className='h-32 w-32 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src='https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403' alt="" />
                        <p className='text-lg font-semibold w-32 truncate text-center mt-2'>Cats</p>
                    </div>
                    <div>
                        <img className='h-32 w-32 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src='https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403' alt="" />
                        <p className='text-lg font-semibold w-32 truncate text-center mt-2'>Dogs</p>
                    </div>
                    <div>
                        <img className='h-32 w-32 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/800px-Plus_symbol.svg.png' alt="" />
                        <p className='text-lg font-semibold w-32 truncate text-center mt-2'>New</p>
                    </div>

                </div>
            </div>
            <hr className='mx-[500px] border-gray-600'></hr>
            <div className='lg:flex justify-center items-center space-x-3 mt-5'>
                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

            </div>
            <div className='lg:flex justify-center items-center space-x-3 mt-5'>
                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

            </div>
            <div className='flex justify-center items-center space-x-3 mt-5'>
                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

                <div className='w-[400px] h-[400px] border-gray-300 cursor-pointer hover:opacity-75'>
                    <img src="https://cdn.vnreview.vn/524288_141218525055777_1847291203813376?wt=310bb374e23b5e38073cb93b18733881&rt=3aa018865eb3fadcaae3924d41bd5783"
                        className='h-[400px] w-[400px] object-cover'
                        alt="" />
                </div>

            </div>
        </div>
    )
}

export default HomeInfo