import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        mytoken: null,
        loading: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        tokenSuccess: (state, action) => {
            state.mytoken = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                )
            }
            else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        }
    }
});

export default userSlice.reducer;

export const { loginStart,subscription, tokenSuccess, loginSuccess, loginFailure,logout } = userSlice.actions;