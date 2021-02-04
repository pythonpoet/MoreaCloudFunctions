import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export class Messages {
    async uploadMessage(data: any, context: functions.https.CallableContext) {
        var message = data.message
        message['timestamp'] = admin.firestore.Timestamp.now()
        return db
            .collection("messages")
            .doc()
            .set(message);
    }

    async sendNotificationForMessage(
        data: any,
        context: functions.https.CallableContext
    ) {
        const title: string = data.title;
        const snippet: string = data.snippet;
        const receivers: string[] = data.receivers;
        let registrationTokens: string[] = [];
        for (let receiver of receivers) {
            const group: FirebaseFirestore.CollectionReference = await db
                .collection("groups")
                .doc(receiver).collection("priviledge")
            
            const priviledgedList: string[] = []

            const documentList: Array<FirebaseFirestore.DocumentReference> = await group.listDocuments()
            documentList.forEach((user, idx) => {
                console.log(user.id)
                priviledgedList.push(user.id)
            })

            for (let uid of priviledgedList) {
                const userMap: FirebaseFirestore.DocumentSnapshot = await db
                    .collection("user")
                    .doc(uid)
                    .get();
                const test = userMap.get("devtoken");
                if (test !== undefined) {
                    const devtokensObject: { [key: string]: any } = test;
                    for (let token of Object.values(devtokensObject)) {
                        registrationTokens.push(token);
                    }
                }
            }
        }
        const message = {
            notification: { title: title, body: snippet },
            priority: "high",
            data: { click_action: "FLUTTER_NOTIFICATION_CLICK", typeMorea: 'Message' },
            tokens: registrationTokens,
        };
        console.log(registrationTokens);
        return admin
            .messaging()
            .sendMulticast(message)
            .then(response => {
                if (response.failureCount > 0) {
                    const failedTokens: string[] = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(registrationTokens[idx]);
                        }
                    });
                    console.log(
                        "List of tokens that caused failures: " + failedTokens
                    );
                }
            });
    }
}
