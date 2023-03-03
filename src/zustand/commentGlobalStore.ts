import { create } from 'zustand'

interface ICommentStore {
	globalTextInputRef: any
	globalCommentListRef: any
	isOnReplyMode: boolean
	userNameToReplyTo: string,
	commentIDToReplyTo: string,

	setGlobalTextInputRef: (newGlobalTextInputRef: any) => void
	setGlobalCommentListRef: (newGlobalCommentListRef: any) => void
	setIsOnReplyMode: (newIsOnReplyMode: boolean) => void
	setUserNameToReplyTo: (newUserNameToReplyTo: string) => void
	setCommentIDToReplyTo: (newCommentIDToReplyTo: string) => void
}

export const commentGlobalStore = create<ICommentStore>((set) => ({
	globalTextInputRef: null,
	globalCommentListRef: null,
	isOnReplyMode: false,
	userNameToReplyTo: "",
	commentIDToReplyTo: "",

	setGlobalTextInputRef: (newGlobalTextInputRef) => set(() => ({ globalTextInputRef: newGlobalTextInputRef })),
	setGlobalCommentListRef: (newGlobalCommentListRef) => set(() => ({ globalCommentListRef: newGlobalCommentListRef })),
	setIsOnReplyMode: (newIsOnReplyMode) => set(() => ({ isOnReplyMode: newIsOnReplyMode })),
	setUserNameToReplyTo: (newUserNameToReplyTo) => set(() => ({ userNameToReplyTo: newUserNameToReplyTo })),
	setCommentIDToReplyTo: (newCommentIDToReplyTo) => set(() => ({ commentIDToReplyTo: newCommentIDToReplyTo })),
}))