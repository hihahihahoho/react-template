import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuthStore = create(
	persist(
		(set) => ({
			user: null,
			setUser: (user: any) => set({ user: user }),
		}),
		{
			name: 'user-storage', // unique name
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
export default useAuthStore;
