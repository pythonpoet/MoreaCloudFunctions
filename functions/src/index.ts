import {getAuth} from "firebase-admin/auth";
import {onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {logger} from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();

export const createAccount = onCall({region: "europe-west1"}, (request) => {
  return getAuth()
    .createUser({
      email: request.data.email,
      password: request.data.password,
    })
    .then((userRecord) => {
      logger.log(userRecord.uid);
      return {uid: userRecord.uid};
    })
    .catch((error) => {
      return logger.error(error);
    });
});
