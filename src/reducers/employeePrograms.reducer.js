import { employeeProgramConstants } from "../constants";

export function employeePrograms(state = {}, action) {
  switch (action.type) {
    case employeeProgramConstants.GET_APPROVED_PROGRAM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeProgramConstants.GET_APPROVED_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action?.data?.data?.charity_program?.employee_program
      };
    case employeeProgramConstants.GET_APPROVED_PROGRAM_FAILURE:
      return {
        loading: false
      };
    default:
      return state;
  }
}
