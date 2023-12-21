import { useAuth } from '@/stores';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const profileStore = useAuth((state) => state.profile);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-md font-bold text-gray-400">Follower list</h3>
        <button className="btn-no-fill-primary">See All</button>
      </div>

      {profileStore &&
        profileStore?.followInfo?.map((profile, idx) => (
          <div key={idx} className="flex items-center justify-between mt-3">
            <img
              className="w-10 h-10 rounded-full border p-[2px]"
              src={profile.avatar}
              alt=""
            />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm ">{profile.name}</h2>
              <h3 className="text-sm text-gray-400">{profile.email}</h3>
            </div>
            <button
              onClick={() => router.push('/chat')}
              className="btn-no-fill-secondary"
            >
              Mess now
            </button>
          </div>
        ))}
    </div>
  );
};

export default Suggestions;
