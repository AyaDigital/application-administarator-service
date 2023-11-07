import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchWrapper } from '_helpers';
// create slice

const name = 'profile';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const profileActions = { ...slice.actions, ...extraActions };
export const profileReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        profile: {},
        roles: {
            list: [],
            loading: false,
            error:  ''
        }
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_BACKEND_API}/profile`;
    const rolesUrl = `${process.env.REACT_APP_BASE_ADMIN_URL}/api/profiles/roles`;

    return {
        getProfile: getProfile(),
        getProfileRoles: getProfileRoles()
    };

    function getProfile() {
        return createAsyncThunk(
            `${name}/getProfile`,
			async () => await fetchWrapper.get(baseUrl)
        );
    }

    function getProfileRoles() {
        return createAsyncThunk(
            `${name}/getProfileRoles`,
			async () => await fetchWrapper.get(rolesUrl)
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll();
        getRoles();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getProfile;
            builder
                .addCase(pending, (state) => {
                    state.profile = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.profile = action.payload;
                })
                .addCase(rejected, (state, action) => {
                    state.profile = { error: action.error };
                });
        };

        function getRoles() {
            var { pending, fulfilled, rejected } = extraActions.getProfileRoles;
            builder
                .addCase(pending, (state) => {
                    state.roles = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.roles = {
                        loading: false,
                        list: action.payload
                    }
                })
                .addCase(rejected, (state, action) => {
                    state.profile = {
                        loading: false,
                        list: [],
                        error: action.error
                    };
                });
        }
    }
}
