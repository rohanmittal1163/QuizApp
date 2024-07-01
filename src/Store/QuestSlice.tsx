import { createSlice } from '@reduxjs/toolkit';

export interface stateType {
	Quest: InitStateType;
}

interface InitStateType {
	quest?: QuesType[];
	size?: number;
	time?: number;
	answer: number[];
}

export interface QuesType {
	id: string;
	question: string;
	options: OptionType[];
	answer: number;
}

interface OptionType {
	id: string;
	option: string;
}

interface createSliceOptionsType {
	name: string;
	initialState: InitStateType;
	reducers: {
		initialize(state: InitStateType, action: actionType): InitStateType;
		UpdateAnswerKey(state: InitStateType, action: actionType): InitStateType;
	};
}

interface actionType {
	type: string;
	payload: InitStateType;
}

const createSliceOptions: createSliceOptionsType = {
	name: 'Quest',
	initialState: {
		quest: [],
		size: 0,
		time: 0,
		answer: [],
	},
	reducers: {
		initialize(state: InitStateType, action: actionType): InitStateType {
			return {
				...state,
				time: action.payload.time,
				size: action.payload.size,
				quest: action.payload.quest,
				answer: action.payload.answer,
			};
		},
		UpdateAnswerKey(state: InitStateType, action: actionType): InitStateType {
			return {
				...state,
				answer: action.payload.answer,
			};
		},
	},
};

const QuestSlice = createSlice(createSliceOptions);

export const { initialize, UpdateAnswerKey } = QuestSlice.actions;
export default QuestSlice.reducer;
