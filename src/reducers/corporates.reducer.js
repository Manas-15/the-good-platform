import { corporateConstants } from '../constants';

export function corporates(state = {}, action) {
    switch (action.type) {
        case corporateConstants.GET_CORPORATES_REQUEST:
            return {
                loading: true
            };
        case corporateConstants.GET_CORPORATES_SUCCESS:
            return {
                items: action.corporates
            };
        case corporateConstants.GET_CORPORATES_FAILURE:
            return {
                error: action.error
            };
        case corporateConstants.ADD_CORPORATE_REQUEST:
            return { addingCorporate: true };
        case corporateConstants.ADD_CORPORATE_SUCCESS:
            return {};
        case corporateConstants.ADD_CORPORATE_FAILURE:
            return {};
        default:
            return state
    }
}