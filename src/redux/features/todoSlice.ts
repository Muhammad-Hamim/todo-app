import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    deleteTaskModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { addTaskModal, deleteTaskModal } = todoSlice.actions;
export default todoSlice.reducer;
