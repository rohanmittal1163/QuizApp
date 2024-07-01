import { configureStore } from '@reduxjs/toolkit';
import QuestSlice from './QuestSlice';

const store = configureStore({
	reducer: {
		Quest: QuestSlice,
	},
});

export default store;
