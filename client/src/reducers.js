import {
  AUTH,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SHOW_NOTICE,
  HIDE_NOTICE
} from "./constants";

const initialState = {
  isLoading: true,
  activeDialog: null,
  notice: null,
  currentUser: null,
  errors: []
};

const root = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.INIT:
      return {
        ...state,
        isLoading: false,
        currentUser: action.currentUser
      };

    /*
     * signup actions
     */
    case AUTH.SIGNUP_REQUEST:
      return { ...state, isLoading: true };

    case AUTH.SIGNUP_SUCCESS:
      return {
        ...state,
        activeDialog: null,
        isLoading: false
      };

    case AUTH.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.errors
      };

    /*
     * signin actions
     */
    case AUTH.SIGNIN_REQUEST:
      return { ...state, isLoading: true };

    case AUTH.SIGNIN_SUCCESS:
      return {
        ...state,
        activeDialog: null,
        isLoading: false,
        currentUser: action.currentUser
      };

    case AUTH.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.errors
      };

    /*
     * signout actions
     */
    case AUTH.SIGNOUT_REQUEST:
      return { ...state, isLoading: true };

    case AUTH.SIGNOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: null
      };

    case AUTH.SIGNOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.errors
      };

    /*
     * dialog actions
     */

    case OPEN_DIALOG:
      return {
        ...state,
        activeDialog: action.dialog
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        activeDialog: null
      };

    /*
     * notice actions
     */

    case SHOW_NOTICE:
      return {
        ...state,
        notice: {
          message: action.message
        }
      };

    case HIDE_NOTICE:
      return { ...state, notice: null };

    /*
     * return default
     */

    default:
      return state;
  }
};

export default root;
