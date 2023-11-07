import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, checkAuth } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        user: null,
        error: null,
        token: null,
        isAuthReady: false,
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
		checkAuth.logout();
        history.navigate('/login');
    }
}

function createExtraActions() {

    return {
		keyckloakLogin: keyckloakLogin()
    };

    function keyckloakLogin() {
        return createAsyncThunk(
            `${name}/keyckloakLogin`,
			async () => await checkAuth.get()
        );
    }
}

function createExtraReducers() {
    return (builder) => {

		return {
			...keyckloakLogin()
		};

        function keyckloakLogin() {
            var { pending, fulfilled, rejected } = extraActions.keyckloakLogin;

            builder
                .addCase(pending, (state) => {
                    state.error = null;
                })
                .addCase(fulfilled, (state, action) => {
					state.token = action.payload;
                    state.error = null;
					state.isAuthReady = action.payload ? true : false;
                })
                .addCase(rejected, (state, action) => {
                    state.error = action.error;
                });
        }

    };
}
