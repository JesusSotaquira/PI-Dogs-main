import { GET_DOGS } from '../actions/dogsActions';

const initialState = {
    dogs: [],
    dogDetails: null
};

export default function dogsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            };
        default:
            return state;
    }
}
