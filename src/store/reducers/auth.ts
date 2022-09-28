import { createSlice } from "@reduxjs/toolkit";
import { RootDispatch } from "..";
import { $auth } from "../../constants/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLogged: false,
    isLoading: true,
  },
  reducers: {
    SET_USERINFO(state, { payload }) {
      const { accessToken, ...rest } = payload.user;
      state.user = rest;
      state.token = accessToken;
      state.isLogged = true;
    },
    CHANGE_APP_LOADING(state, { payload }) {
      state.isLoading = payload;
    },
    SIGN_OUT(state) {
      signOut($auth);
      state.isLogged = false;
      state.user = null;
      state.token = null;
    },
  },
});

const { SET_USERINFO, CHANGE_APP_LOADING, SIGN_OUT } = authSlice.actions;
const authReducer = authSlice.reducer;

const authMe =
  (): any =>
  (dispatch: RootDispatch): void => {
    dispatch(CHANGE_APP_LOADING(true));
    onAuthStateChanged($auth, (user: any) => {
      if (user) {
        dispatch(
          SET_USERINFO({
            user: {
              email: user.email,
              uid: user.uid,
              accessToken: user?.accessToken,
            },
          })
        );
      }
      dispatch(CHANGE_APP_LOADING(false));
    });
  };

export { authReducer, SET_USERINFO, authMe, CHANGE_APP_LOADING, SIGN_OUT };
