"use client"
import Image from 'next/image'
import React from 'react'


function Login() {
    return (
        <div className='flex items-center justify-center mt-[100px] mx-10 mx-auto'>
            <div className='mr-10 mt-8 hidden lg:block'>
                <Image
                    src="https://blog.hootsuite.com/wp-content/uploads/2022/01/Instagram-statistics.png"
                    alt="Facebook logo"
                    width={805}
                    height={305}
                />
            </div>
            <div>
            <div className='border border-gray-300 mt-10 w-[550px] h-[600px] '>
                <div className='lg:block ml-[125px] mt-[50px] w-[300px] justify-center mb-16'>
                    <img src="https://links.papareact.com/ocw" alt="" />
                </div>
                <div className='items-center'>
                    <label htmlFor="signInPageEmail">
                        {''}
                        <input
                            className=" w-[400px] h-[50px] ml-[75px] rounded-md py-5 border border-stone-300 bg-[#fafafa] px-2  text-sm focus:outline-none "
                            type="email"
                            id="signInPageEmail"
                            placeholder="Email address"
                        />
                    </label>
                    <label htmlFor="signInPagePassword">
                        {' '}
                        <input
                            className=" w-[400px] h-[50px] ml-[75px] rounded-md py-5 border border-stone-300 bg-[#fafafa] px-2  text-sm focus:outline-none my-3"
                            type="password"
                            id="signInPagePassword"
                            placeholder="Password"
                        />
                    </label>
                    <button className="bg-blue-400 hover:bg-blue-700 text-white w-[400px] h-[45px] ml-[75px] rounded-xl shadow-lg text-lg font-bold mt-2">
                        Đăng Nhập
                    </button>
                    <div className="flex items-center my-6">
                        <hr className="ml-8 flex-grow border-gray-300" />
                        <span className="px-2 text-gray-500 mx-5 font-bold">OR</span>
                        <hr className="mr-8 flex-grow border-gray-300" />
                    </div>
                    <div className="flex flex-col items-center justify-center py-2">
                        <button className="flex items-center space-x-2 text-blue-800 hover:text-blue-950 text-lg font-semibold py-2 px-4 rounded ">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                                alt="Facebook logo"
                                width={25}
                                height={25}
                            />
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                        <a href="/forgot-password" className="text-blue-600 hover:text-blue-800 mt-5">Quên mật khẩu?</a>
                    </div>
                </div>

            </div>
            <div className='flex border items-center justify-center border-gray-300 mt-10 w-[550px] h-[90px] '>
                <p className='text-xl '>
                    Ban chua co tai khoan u?
                </p>
                <p className='text-xl font-bold text-blue-500 hover:text-blue-800 ml-2 cursor-pointer'>Dang Ki</p>
            </div>
            </div>
        </div>
    )
}

export default Login