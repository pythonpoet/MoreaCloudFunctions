/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import {FirebaseAuthError, getAuth} from "firebase-admin/auth";
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {logger} from "firebase-functions";

import {getFirestore} from "firebase-admin/firestore";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
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

export const createTestGroup = onCall({region: "europe-west1"}, () => {
  const docRef = getFirestore().collection("/groups").doc();
  return getFirestore()
    .doc("/groups/" + docRef.id)
    .create({
      groupID: docRef.id,
      groupNickName: "Functions Test Gruppe",
      stufe: "691a01727e8b7ecfa10b126c",
      teleblitzComment: "Bitte an- und abmelden",
      teleblitzDate: "Samstag, 22.03.2025",
      teleblitzEndeFerien: "29.03.2025",
      teleblitzEndingPlace: "Waldrand",
      teleblitzEndingPlaceURL: "maps.google.ch",
      teleblitzEndingTime: "17:00",
      teleblitzGrund: "Leiterweekend",
      teleblitzMitnehmen: ["Wanderschuhe"],
      teleblitzSender: "Mit Freud debii Roran",
      teleblitzSignedOut: [],
      teleblitzSignedUp: [],
      teleblitzStartingPlace: "Lokal",
      teleblitzStartingPlaceURL: "maps.google.ch",
      teleblitzStartingTime: "14:00",
      teleblitzTyp: "ferien",
    });
});

export const updateUserEmail = onCall(
  {region: "europe-west1"},
  async (request) => {
    // 1. Basic Security & Validation
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const {uid, email} = request.data;
    if (!uid || !email) {
      throw new HttpsError("invalid-argument", "Missing UID or Email.");
    }

    try {
      // 2. Update Firebase Auth
      const userRecord = await getAuth().updateUser(uid, {email: email});
      logger.log("Auth update successful", userRecord.uid);

      // 3. Update Firestore
      try {
        await getFirestore().doc(`/user/${uid}`).update({Email: email});
        return {success: true}; // Success response
      } catch (firestoreErr) {
        logger.error("Firestore update failed", firestoreErr);
        // Even if Firestore fails, Auth was already changed.
        // You might want a specific error code for this "partial" success.
        throw new HttpsError("internal", "Auth updated, but Firestore failed.");
      }
    } catch (authErr) {
      logger.error("Auth update failed", authErr);

      throw new HttpsError("invalid-argument", "Auth update failed");
    }
  }
);

export const deleteUser = onDocumentUpdated(
  {document: "user/{uid}", region: "europe-west1"},
  async (event) => {
    if (!event.data) {
      logger.warn("Event data is undefined for deleteUser trigger");
      return null;
    }
    const newValue = event.data.after.data();
    if (newValue.delete) {
      try {
        await getAuth().getUser(newValue.UID);
      } catch (error) {
        if (
          error instanceof FirebaseAuthError &&
          error.code === "auth/user-not-found"
        ) {
          logger.log("User doesnt exist in Auth, possible if child account.");
        } else {
          logger.error("Error deleting user whilst getting User:", error);
        }
      }
      try {
        await getAuth().deleteUser(newValue.UID);
      } catch (error) {
        logger.error(
          "Error deleting user whilst deleting User via Auth:",
          error
        );
      }
      try {
        if (newValue.Eltern) {
          for (const parent of newValue.Eltern) {
            if (Object.prototype.hasOwnProperty.call(newValue.Eltern, parent)) {
              const parentDocRef = getFirestore().doc("user/" + parent);
              const children = (await parentDocRef.get()).data()?.Kinder;
              if (children && Array.isArray(children)) {
                const updatedChildren = children.filter(
                  (childUID: string) => childUID !== newValue.UID
                );
                await parentDocRef.update({Kinder: updatedChildren});
              }
            }
          }
          const groupDocRef = getFirestore().doc("groups/" + newValue.groupID);
          const groupDoc = await groupDocRef.get();
          const groupDocData = groupDoc.data();
          const groupSignedUp = groupDocData?.teleblitzSignedUp;
          const groupSignedOut = groupDocData?.teleblitzSignedOut;
          if (groupSignedUp && Array.isArray(groupSignedUp)) {
            const updatedSignedUp = groupSignedUp.filter(
              (memberUID: string) => memberUID !== newValue.UID
            );
            await groupDocRef.update({teleblitzSignedUp: updatedSignedUp});
          }
          if (groupSignedOut && Array.isArray(groupSignedOut)) {
            const updatedSignedOut = groupSignedOut.filter(
              (memberUID: string) => memberUID !== newValue.UID
            );
            await groupDocRef.update({teleblitzSignedOut: updatedSignedOut});
          }
        }
        if (newValue.Kinder) {
          for (const child of newValue.Kinder) {
            const childDocRef = getFirestore().doc("user/" + child);
            const childDoc = await childDocRef.get();
            const parents = childDoc.data()?.Eltern;
            const fullAccount = childDoc.data()?.fullAccount;
            if (parents && Array.isArray(parents)) {
              if (parents.length === 1 && fullAccount === false) {
                await childDocRef.delete();
              } else {
                const updatedParents = parents.filter(
                  (parentUID: string) => parentUID !== newValue.UID
                );
                await childDocRef.update({Eltern: updatedParents});
              }
            }
          }
        }
        await getFirestore()
          .doc("user/" + newValue.UID)
          .delete();
      } catch (error) {
        logger.error("Error deleting user from Firestore:", error);
      }
    }
    return null;
  }
);
