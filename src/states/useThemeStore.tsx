import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useThemeStore = create(
	persist(
		(set) => ({
			theme: '',
			mode: 'light',
			toggleMode: () => set((state: any) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
			setTheme: (name: any) => set({ theme: name }),
			resetTheme: () => set({ theme: '' }),
		}),
		{
			name: 'theme-storage', // unique name
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
export default useThemeStore;
