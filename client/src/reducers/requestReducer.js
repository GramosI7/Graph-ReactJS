import {REQUEST_DATA} from "../actions/types";

const initialState = {
    dataCAC40: {},
    dataNASDAQ: {},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REQUEST_DATA:
        return {
            ...state,
            dataCAC40: action.payload.CAC40,
            dataNASDAQ: action.payload.NASDAQ
        }
        default: 
            return state;
    }
}