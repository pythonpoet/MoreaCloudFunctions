import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export class UserMap {
  async create(data: any, context: functions.https.CallableContext) {
    return db.collection("user").doc(data.UID).create(data.content);
  }
  async update(data: any, context: functions.https.CallableContext) {
    return db.collection("user").doc(data.UID).set(data);
  }

  async updateAllParents(data: any, context: functions.https.CallableContext) {
    const elternList = data.elternList;
    const oldChildUID = data.oldChildUID;
    for (let elternUID of elternList) {
      let elternUserMap = (
        await db.collection("user").doc(elternUID).get()
      ).data();
      if (elternUserMap !== undefined) {
        let elternKinderMap = elternUserMap["Kinder"];
        delete elternKinderMap[oldChildUID];
        elternKinderMap[data.UID] = data.vorname;
        elternUserMap["Kinder"] = elternKinderMap;
        await db.collection("user").doc(elternUID).set(elternUserMap);
      }
    }
    return null;
  }

  async delete(data: any, context: functions.https.CallableContext) {
    return db.collection("user").doc(data.UID).delete();
  }

  async deviceTokenUpdate(data: any, context: functions.https.CallableContext) {
    const clientUID: string = data.UID;
    const devtoken: string = data.devtoken;
    const devID: string = data.deviceID;
    let clientData: any = undefined;
    do {
      clientData = (await db.collection("user").doc(clientUID).get()).data();
    } while (typeof clientData === undefined);

    if (!("devtoken" in clientData)) {
      clientData["devtoken"] = { [devID]: devtoken };
    } else {
      const devtokenMap: any = clientData["devtoken"];
      if (devID in devtokenMap) {
        if (devtokenMap[devID] === devtoken) {
          return;
        } else {
          devtokenMap[devID] = devtoken;
          clientData["devtoken"] = devtokenMap;
        }
      } else {
        devtokenMap[devID] = devtoken;
        clientData["devtoken"] = devtokenMap;
      }
    }
    return db.collection("user").doc(clientUID).set(clientData);
  }
  async groupIDUpdate(data: any, context: functions.https.CallableContext) {
    const userUID: string = data.UID;
    const groupID: string = data.groupID;
    const userDocRef: FirebaseFirestore.DocumentReference = db
      .collection("user")
      .doc(userUID);
    return db.runTransaction((t) => {
      return t
        .get(userDocRef)
        .then((dSuserDoc) => {
          const userDoc: any = dSuserDoc.data();
          let groupIDs: Array<string> = userDoc["groupIDs"];
          if (groupIDs.includes(groupID)) {
            return null;
          } else {
            groupIDs.push(groupID);
            userDoc["groupIDs"] = groupIDs;
            return t.update(userDocRef, userDoc);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  async makeLeiter(data: any, context: functions.https.CallableContext) {
    const requestString: string = data.request;
    const requestRef: FirebaseFirestore.DocumentReference = db
      .collection("request")
      .doc(requestString);
    const rawRequest: any = await requestRef.get();

    if (rawRequest.exists) {
      const requestData = rawRequest.data();
      const clientRef: FirebaseFirestore.DocumentReference = db
        .collection("user")
        .doc(requestData.UID);
      requestRef.delete().catch((e) => console.error(e));
      let clientData: any;
      await db
        .runTransaction((t) => {
          return t
            .get(clientRef)
            .then((clientDoc) => {
              clientData = clientDoc.data();
              clientData["Pos"] = "Leiter";
              t.update(clientRef, clientData);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
      for (const groupID of clientData["groupIDs"]) {
        await db.runTransaction(async (t) => {
          const groupRef = db
            .collection("groups")
            .doc(groupID)
            .collection("priviledge")
            .doc(requestData.UID);
          const groupDoc = await t.get(groupRef);
          const groupDocData = groupDoc.data()!;
          groupDocData.roleType = "Leiter";
          groupDocData.customInfo.Pos = "Leiter";
          t.update(groupRef, groupDocData);
        });
      }
    }
    return Promise.resolve();
  }

  async deactivateDeviceNotification(
    data: any,
    context: functions.https.CallableContext
  ) {
    const uid: string = data.uid;
    const deviceID: string = data.deviceID;
    const ref: FirebaseFirestore.DocumentReference = db
      .collection("user")
      .doc(uid);
    db.runTransaction((t) => {
      return t
        .get(ref)
        .then((doc) => {
          const map = doc.data();
          const field = doc.get("devtoken");
          const newField: { [key: string]: any } = {};
          for (const device of Object.keys(field)) {
            if (device !== deviceID) {
              newField[device] = field[device];
            }
          }
          if (map !== undefined) {
            map["devtoken"] = newField;
            return t.set(ref, map);
          } else {
            return null;
          }
        })
        .catch((err) => console.error(err));
    }).catch((err) => console.error(err));
  }
}
