import {
    SET_DOMAIN_DATA_IN_REDUX
} from './actionTypes';

const createHeaderData = (data) => {
    let parsedData = {
        ...this.state.headerData,
        domain_name: _get(newState, "domain_data.name", ""),
        is_verified: _get(newState, "domain_data.is_verified", false),
        review_length: _get(newState, "reviews.domain.reviews", []).length,
        rating: _get(newState, "general_analysis.payload.ratings.watchdog", 0)
    }
    return parsedData;
};

export const setDomainDataInRedux = (profileData, isLoading) => {
    const data = {
        headerData: createHeaderData(profileData)
    }
    return {
        type: SET_DOMAIN_DATA_IN_REDUX

    }
}