import { configureStore, combineReducers } from "@reduxjs/toolkit";

// 관리할 Slice
import listDataReducer from "./listData";

// 각 reducer를 호출하여 초기 상태를 검색
const rootReducer = combineReducers({ listData: listDataReducer });

export default configureStore({
  // reducer에서 반환된 새로운 state를 store라는 객체로 정리해 관리하는 곳
  reducer: {
    listData: listDataReducer,
  },
});
