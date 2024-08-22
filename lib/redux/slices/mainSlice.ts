import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MemoState {
  selected: boolean
}

const initialState: MemoState = {
  selected: false
}

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    testSlice: (state, action: PayloadAction<string | number | undefined>) => {
      console.log(action.payload)
      console.log({state})
      return state
    }
  }
})


export const { testSlice } = MainSlice.actions

export default MainSlice.reducer
