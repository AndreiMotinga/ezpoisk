import Api from "./api";
import { AUTH, OPEN_DIALOG, CLOSE_DIALOG, REQUEST_START } from "./constants";

/**
 * Initial setup
 */

export function initUser() {
  return Api.initUser();
}

export function init(currentUser) {
  return {
    type: AUTH.INIT,
    currentUser
  };
}

/**
 * generic flow
 */

export function requestStart() {
  return {
    type: REQUEST_START
  };
}

/**
 * singup flow
 */
export function signup(email, password) {
  return Api.signup(email, password);
}

export function signupRequest() {
  return {
    type: AUTH.SIGNUP_REQUEST
  };
}

export function signupFailure(errors) {
  return {
    type: AUTH.SIGNUP_FAILURE,
    errors
  };
}

/**
 * singin flow
 */

export function signin(email, password) {
  return Api.signin(email, password);
}

export function signinRequest(email, password) {
  return {
    type: AUTH.SIGNIN_REQUEST,
    email,
    password
  };
}

export function signinSuccess(currentUser) {
  return {
    type: AUTH.SIGNIN_SUCCESS,
    currentUser
  };
}

export function signinFailure(errors) {
  return {
    type: AUTH.SIGNIN_FAILURE,
    errors
  };
}

/**
 * singout flow
 */
export function signout() {
  return Api.signout();
}

export function signoutRequest() {
  return {
    type: AUTH.SIGNOUT_REQUEST
  };
}

export function signoutSuccess() {
  return {
    type: AUTH.SIGNOUT_SUCCESS
  };
}

export function signoutFailure(errors) {
  return {
    type: AUTH.SIGNOUT_FAILURE,
    errors
  };
}

/**
 * dialogs flow
 */
export function openDialog(dialog, images) {
  return {
    type: OPEN_DIALOG,
    dialog,
    images
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG
  };
}
