let state = {
    username: null,
    id: null
}

export const AuthStore = {
    updateState(data) {
        state = {
            ...state,
            ...data
        }
    },

    getUserName() {
        return state.username;
    },

    getUserId() {
        return state.id;
    }
};
