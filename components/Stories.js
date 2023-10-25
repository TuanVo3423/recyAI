"use client" //
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react'
import Story from './Story';


function Stories() {

    const [suggestions,setSuggestions] = useState([])
    useEffect(()=>{
        const suggestions = [...Array(10)].map((_,i)=>({
            userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
        }));
        setSuggestions(suggestions);
    },[])

  return (
    <div className='flex space-x-10 h-[150px] w-[766px] p-6 bg-transparent mt-2 border-none rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
        {suggestions.map(profile =>(
            <Story key={profile.id}
            img={profile.avatar}
            username={profile.username}
            />
        ))}

    </div>
  )
}

export default Stories