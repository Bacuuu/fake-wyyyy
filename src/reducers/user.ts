import { ADD, RESET } from "../constants/user";
const INITIAL_STATE = {
  userInfo: {}
}
export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        userInfo: action.payload
      }
      break;
    case RESET:
      return {
        userInfo: {}
      }
      break;
    default:
      return state
      break;
  }
}