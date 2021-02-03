import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { UserMap } from './userMap';
import { object } from 'firebase-functions/lib/providers/storage';
import { PriviledgeEntry} from '../lib/priviledge_data'
import { pathGroups, pathPriviledge, userMapUID, userMapgroupID, groupMapDisplayName, groupMapPriviledgeEntryCustomInfo } from '../param/morea_strings';
const db = admin.firestore();

export class GroupMap{
    async getPriviledgeUsers(groupID: string): Promise<Array<string>>{
        let arr = new Array<string>()
            await db.collection("groups").doc(groupID).get().then(async snap =>{
            if(!snap.exists){
                console.error("DevToken should not be empty --> teleblitz_create.ts")
                return arr
            }     
            const groupData = snap.data()
            if(groupData === undefined){
                console.error("groupData is undefined --> teleblitzS_create.ts")
                return arr
            }
                
            if(!("Priviledge" in groupData)){
                console.log("Group: " + groupID + "has no Priviledge users")
                return arr
            }
                           
            const userIDs:Array<string> = Object.keys(groupData.Priviledge)
            arr = userIDs
            return userIDs
        }).catch(err =>{
            console.error(err)
        })
        return arr
    }
    async getChildAndHisParentsDevTokens(childuserIDs:Array<string>):Promise<Array<string>>{
        let arr = new Array<string>()
        for(const i in childuserIDs){
            const childUserID:string = childuserIDs[i]
            const child: any = await db.collection("user").doc(childUserID).get()
            if(child.exists){
                const childData:any = child.data()
                if("devtoken" in childData){
                    if(childData.devtoken instanceof Object || childData.devtoken instanceof object)
                        arr.push(...new Array<string>(...Object.values<string>(childData.devtoken)))
                    else if(childData.devtoken instanceof Array){
                        console.error("devToken format is deprecated: " + JSON.stringify(childData.devtoken) + "(User: " + childUserID + " )")
                        arr.push(...childData.devtoken)
                    }
                    else
                        console.error("devToken is malformed: " + JSON.stringify(childData.devtoken) + "(User: " + childUserID + " ). And has type: " + typeof childData.devtoken)
                    }

                else if("devToken" in childData){
                    arr.push(...childData.devToken)
                    console.error("Attention wrong key in userMap found. Change devToken to devtoken. --> groupMap.ts")                    
                }

                if("Eltern" in childData){
                    const elternarr:Array<string> = new Array(...(await this.getDeviceTokenFromChildParents(childData)))
                    arr.push(...elternarr)
                }
                
            }else
                console.error("child with userID: " + childUserID + " does not exists")
        }
        return arr  
    }

    async getDeviceTokenFromChildParents(childMap:any): Promise<Array<string>>{
        var arr = new Array<string>()
        if(!("Eltern" in childMap))
            return arr
        
        arr.push(...Object.keys(childMap.Eltern))
        var devTokenArray = new Array<string>()
        for(const i in arr){
            const parentUserID:string = arr[i]
            const parent: any = await db.collection("user").doc(parentUserID).get()
            if(parent.exists){
                const parentData:any = parent.data()
                if("devtoken" in parentData){
                    if(parent.devtoken instanceof Object || parentData.devtoken instanceof object)
                        devTokenArray.push(...new Array<string>(...Object.values<string>(parentData.devtoken)))
                    else if(parent.devtoken instanceof Array){
                        console.error("devToken format is deprecated: " + JSON.stringify(parentData.devtoken) + "(User: " + parentUserID + " )")
                        devTokenArray.push(...parentData.devtoken)
                    }else
                        console.error("devToken is malformed: " + JSON.stringify(parentData.devtoken) + "(User: " + parentUserID + " ). And has type: " + typeof parentData.devtoken)
                    }
                else if("devToken" in parentData){
                    devTokenArray.push(...parentData.devToken)
                    console.error("Attention wrong key in userMap found. Change devToken to devtoken. --> groupMap.ts")
                }}else
                    console.error("parent with userID: " + parentUserID + " does not exists")
        }    
        return devTokenArray
    }

    async createUserPriviledgeEntry(data:any, context: functions.https.CallableContext){
        console.log("context userID: ", context.auth?.uid);
        const userID:string = data[userMapUID]
        const groupID:string = data[userMapgroupID]
        const displayName:string = data[groupMapDisplayName]
        const customInfo: any = data[groupMapPriviledgeEntryCustomInfo];


        console.log("transmitted Data: ", data)

        //quick fix



        const priviledgeRef:FirebaseFirestore.DocumentReference = db.collection(pathGroups).doc(groupID).collection(pathPriviledge).doc(userID)
        const userPriviledgeEntry = new PriviledgeEntry(undefined)
        userPriviledgeEntry.create("Teilnehmer", "local", customInfo, displayName)
        try{
            if(userPriviledgeEntry.validate())
            await priviledgeRef.create(userPriviledgeEntry.pack())
        }catch(e){
            console.error("could not create PriviledgeEntry because of: ",e)
        }
        
        return
        
    }
    async deSubFromGroup(data:any, context: functions.https.CallableContext){
        const userID:string = data.UID
        const groupID:string = data.groupID
        const groupRef:FirebaseFirestore.DocumentReference = db.collection(pathGroups).doc(groupID).collection(pathPriviledge).doc(userID)
        const userDocRef:FirebaseFirestore.DocumentReference = db.collection("user").doc(userID)
        groupRef.delete
        await db.runTransaction(async t =>{
            try {
                const dSuserDoc = await t.get(userDocRef);
                const userDoc: any = dSuserDoc.data();
                let groupIDs: Array<string> = userDoc["groupIDs"];
                const index = groupIDs.indexOf(groupID, 0);
                if (index > -1) {
                    groupIDs.splice(index, 1);
                    userDoc["groupIDs"] = groupIDs;
                    return t.update(userDocRef, userDoc);
                } else {
                    console.error("groupID entry in users: ", userID, " couldn't be read (groupID: ", groupID, ")");
                    return null;
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        })
    }
    
    async goToNewGroup(data:any, context: functions.https.CallableContext){
        const oldGroup:Array<string> = data.oldGroup
        const newGroup:Array<string> = data.newGroup
        const userMap = new UserMap
        data.groupID = oldGroup[0]
        await this.deSubFromGroup(data, context)
        data.groupID = newGroup[0]
        await userMap.groupIDUpdate(data, context)
        return this.createUserPriviledgeEntry(data, context)
    }
    async makeLeiter(data:any, context: functions.https.CallableContext){
        const userID:string = data.UID
        const groupID:string = data.groupID
        const displayName:string = data.DisplayName

        const groupRef:FirebaseFirestore.DocumentReference = db.collection("groups").doc(groupID)

        return db.runTransaction(t =>{
            return t.get(groupRef).then((dSgroup)=>{
                let groupData:any = dSgroup.data()
                let priviledge:any
                if("Priviledge" in groupData){
                    priviledge = groupData["Priviledge"]
                    priviledge[userID]={"DisplayName": displayName, 
                    "Priviledge": 3}
                }else{
                    priviledge = {userID:{"DisplayName": displayName, 
                    "Priviledge": 3}}
                    groupData["Priviledge"] = priviledge
                }
                return t.update(groupRef, groupData)
            }).catch((error)=>{
                console.error(error)
                return error
            })
        })
    }
    async priviledgeEltern(data:any, context: functions.https.CallableContext){
        return this.createUserPriviledgeEntry(data, context);
    }

}