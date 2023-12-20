import { IGetFollowMeResponse, IUser } from '@/api/auth';
import { create } from 'zustand';

interface IAuth {
  profile: IUser | null;
  setProfile: (data: IUser) => void;
  clearProfile: () => void;
}

export const useAuth = create<IAuth>((set) => ({
  profile: null,
  setProfile: (data) => set(() => ({ profile: data })),
  clearProfile: () => set(() => ({ profile: null })),
}));
