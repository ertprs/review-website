import {
    SET_DOMAIN_DATA_IN_REDUX
} from '../actions/actionTypes';

const domainProfileReducer = (state = {}, action) => {
    const { type } = action
    switch (type) {
        case SET_DOMAIN_DATA_IN_REDUX: {
            type

        }
        default: return state;
    }
}

export default domainProfileReducer