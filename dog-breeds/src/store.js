import { createStore } from 'redux';

const initialState = {
    caughtBreeds: [],
};

const persistedState = localStorage.getItem('caughtBreeds')
    ? JSON.parse(localStorage.getItem('caughtBreeds'))
    : { caughtBreeds: [] };

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BREED':
            return { ...state, caughtBreeds: [action.payload, ...state.caughtBreeds] };
        case 'REMOVE_BREED':
            return { ...state, caughtBreeds: state.caughtBreeds.filter((_, index) => index !== action.payload) };
        case 'CLEAR_ALL':
            return { ...state, caughtBreeds: [] };
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;