import React from 'react';

type Props = {};

export const AdditionFeed = (props: Props) => {
  return (
    <div className="flex justify-center items-center -mb-10 -mt-10">
      <div className="flex items-center justify-center space-x-14 h-[280px] w-[766px] p-6 bg-transparent mt-2 border-none rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        <div className=''>
          <img
            className="h-20 w-20 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-full p-[2px] object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
            src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
            alt=""
          />
          <p className="text-lg font-semibold w-20 truncate text-center mt-2">
            Cats
          </p>
        </div>
        <div>
          <img
            className="h-20 w-20 rounded-full p-[2px] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
            src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
            alt=""
          />
          <p className="text-lg font-semibold w-20 truncate text-center mt-2">
            Dogs
          </p>
        </div>
        <div>
          <img
            className="h-20 w-20 rounded-full p-[2px] object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/800px-Plus_symbol.svg.png"
            alt=""
          />
          <p className="text-lg font-semibold w-20 truncate text-center mt-2">
            New
          </p>
        </div>
      </div>
    </div>
  );
};
