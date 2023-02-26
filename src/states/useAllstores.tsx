import produce from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useImageUploadStateStore = create(
	devtools((set) => ({
		filesStates: {},
		createFile: (name: any) =>
			set(
				produce((draft: any) => {
					draft.filesStates[name] = {};
				}),
			),
		updateFileState: (name: any, state: any) =>
			set(
				produce((draft: any) => {
					draft.filesStates[name].state = state;
				}),
			),
		updateFileUrl: (name: any, url: any) =>
			set(
				produce((draft: any) => {
					draft.filesStates[name].url = url;
				}),
			),
		updateFileID: (name: any, id: any) =>
			set(
				produce((draft: any) => {
					draft.filesStates[name].id = id;
				}),
			),
		resetFiles: () => set({ filesStates: {} }),
	})),
);
