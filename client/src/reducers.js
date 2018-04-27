import {
  AUTH,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  LISTINGS_SUCCESS,
  GET_LISTING_SUCCESS,
  REQUEST_START
} from "./constants";

const initialState = {
  isLoading: true,
  activeDialog: null,
  currentUser: null,
  errors: [],
  listings: [],
  listing: null // current editable listing
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
     * general actions
     */
    case REQUEST_START:
      return { ...state, isLoading: true };

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
        currentUser: {}
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
      return { ...state, activeDialog: action.dialog };

    case CLOSE_DIALOG:
      return { ...state, activeDialog: null };

    /*
     * listings flow
     */
    case LISTINGS_SUCCESS:
      return { ...state, listings: action.listings };

    case GET_LISTING_SUCCESS:
      return { ...state, isLoading: false, listing: action.listing };

    /*
     * prifile flow
     */

    /*
     * return default
     */

    default:
      return state;
  }
};

export default root;
