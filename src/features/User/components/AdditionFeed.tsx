import React from 'react';

type Props = {};

export const AdditionFeed = (props: Props) => {
  return (
    <div className="flex justify-center items-center -mb-10 -mt-10">
      <div className="flex items-center justify-center space-x-14 h-[280px] w-[766px] p-6 bg-transparent mt-2 border-none rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        <div>
          <img
            className="h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            alt=""
          />
          <p className="text-lg font-semibold w-20 truncate text-center mt-2">
            Cats
          </p>
        </div>
        <div>
          <img
            className="h-20 w-20 rounded-full p-[1.5px] border-red-500 border object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
            src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403"
            alt=""
          />
          <p className="text-lg font-semibold w-20 truncate text-center mt-2">
            Dogs
          </p>
        </div>
        <div>
          <img
            className="h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
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
