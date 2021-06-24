import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { pathEvents } from '../param/morea_strings'

const db = admin.firestore()

export class EventMap{
    async deleteAnmeldungen(change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
        context: functions.EventContext){
            if(change.after.data()!.EventType === "Teleblitz"){
                if(change.after.data()!.datum !== change.before.data()!.datum){
                    const ref = db.collection(pathEvents).doc(context.params.eventID).collection('Anmeldungen')
                    const anmeldungList = await ref.listDocuments()
                    return db.runTransaction(async (t) =>{
                        for(let anmeldung of anmeldungList){
                            t.delete(anmeldung)
                        }
                        return null
                    })
                } else {
                    return null
                }
            } else {
                return null
            }
    }
}