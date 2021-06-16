import { UPDATE, RESET } from "../constants/user";
const INITIAL_STATE = {
  userInfo: null
}
export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE:
      return {
        userInfo: action.payload
      }
      break;
    case RESET:
      return {
        userInfo: null
      }
      break;
    default:
      return state
      break;
  }
}