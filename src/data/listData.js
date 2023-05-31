import { createSlice } from "@reduxjs/toolkit";

// createSlice를 사용하면 따르 액션타입을 정의하지 않아도 자동으로 액션타입을 만들어준다.
export const listSlice = createSlice({
  // 액션 타입에 사용되는 이름.
  name: "listData",
  // reducer 초기 상태 값.
  initialState: {
    value: JSON.parse(localStorage.getItem("lists")) || undefined,
  },
  // reducer 맵. 키값(setUserName)은 작업을 생성하는데 사용.
  reducers: {
    // 리듀서 액션함수
    // action.type = 'auth/setUserName', action.payload = { userName: "xxx" }
    setList: (state, action) => {
      state.value = action.payload;
      window.localStorage.setItem("lists", JSON.stringify(state.value));
    },
  },
});

// action creator함수를 활용하기 위해 export
export const { setList } = listSlice.actions;

export default listSlice.reducer;
