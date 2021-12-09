import { createStore } from "redux";

const initialState = {
    data: [],
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case 'ADD_NUMBER':
            return {
                ...state,
                data: [...action.data ],
            }
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;