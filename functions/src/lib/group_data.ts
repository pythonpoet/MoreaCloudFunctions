import { groupMapHomeFeed, groupMapRoles, groupMapGroupLicence, groupMapGroupOption, groupMapUploadeByUserID, groupMapUploadedTimeStamp, groupMapParticipatingGroups, groupMapEventStartTimeStamp, groupMapEventEndTimeStamp, groupMapDisplayName, groupMapGroupJoinDate, groupMapPriviledgeEntryLocation, groupMapPriviledgeEntryType, groupMapGroupUpperClass, groupMapGroupLowerClass, groupMapAdminGroupMemberBrowser, groupMapEnableDisplayName, groupMapEventTeleblitzEnable, groupMapChatEnable, groupMapGroupLicenceType, groupMapGroupLienceTypePremium, groupMapGroupLienceTypeStandart, groupMapGroupLienceTypeAnarchy, userMapgroupID, groupMapgroupNickName, groupMapPriviledgeEntryName, groupMapPriviledgeEntrySeeMembers, groupMapPriviledgeEntrySeeMembersDetails, eventTeleblitzRead, eventTeleblitzEdit, eventTeleblitzAnmelden, evnetTeleblitzSeeParticipants, eventTeleblitzShare } from "../param/morea_strings"

enum GroupLicenceType{premium, standart, anarchy}

export class GroupData{
    groupLicence!:GroupLicence
    groupOption!: GroupOptions
    homeFeed!: HomeFeed
    priviledge!: Priviledge
    groupData!: Map<string,any>
    roles: Map<string, PriviledgeEntry> | undefined
    groupNickName: string | undefined

    constructor(groupData:Map<string,any>, map:Map<string,any>){
        if(groupData.has(groupMapHomeFeed))
            this.homeFeed = new HomeFeed(new Map(Object.entries(groupData.get(groupMapHomeFeed))))
        else
            console.error("homeFeed of groupMap has to be defined")
        
        if(groupData.has(groupMapRoles)){
            let someMap:Map<string,PriviledgeEntry> = new Map(Object.entries(groupData.get(groupMapRoles)))
            someMap.forEach((value:PriviledgeEntry,key:string,)=>{
                if(key !== undefined)
                    if(typeof key == 'string'){
                        let id:string = key
                        let entry:PriviledgeEntry = new PriviledgeEntry()
                        entry.read(value)
                        if(this.roles !== undefined)
                            this.roles.set(id, entry)
                        else{
                            let obj : {[key:string]: PriviledgeEntry} = {}
                            obj[key] = entry
                            this.roles = new Map<string,PriviledgeEntry>(Object.entries(obj))
                        }
                            
                    }
                else
                    console.error("GroupMapRoles cant be empty")
            })
        }else
            console.error("groupMapRoles of groupMap has to be defined")
        
        if(groupData.has(groupMapGroupLicence))
            this.groupLicence = new GroupLicence(groupData.get(groupMapGroupLicence))
        else
            console.error("groupLicence of groupMap has to be defined")
        
        if(groupData.has(groupMapGroupOption))
            this.groupOption = new GroupOptions(new Map(Object.entries(groupData.get(groupMapGroupOption))))
        else
            console.error("groupMapGroupOptions of groupMap has to be defined")
        //if(groupData.has(groupMapPriviledge))
         //   this.priviledge = new Priviledge(new Map(Object.entries(groupData.get(groupMapPriviledge))), map, this.roles)
       //else console.error("priviledge cant be empty")
        if(groupData.has(groupMapgroupNickName))
            this.groupNickName = groupData.get(groupMapgroupNickName)
        else console.error("GroupNickName cant be empty")

    }
    pack(): object{
        let obj:{ [key: string]: {[key: string] : any }} = {};
        this.roles?.forEach((value, key) => {
            let somObj = Object(value.rolePack())
            obj[key] = somObj})
        return {
            [groupMapGroupLicence] : this.groupLicence.pack(),
            [groupMapGroupOption] : this.groupOption.pack(),
            [groupMapHomeFeed] : this.homeFeed.pack(),
            //[groupMapPriviledge] : this.priviledge.pack(),
            [groupMapRoles] : Object(obj),
            [groupMapgroupNickName]: this.groupNickName,
        }


    }
}

class HomeFeed{
    homeFeed: Map<string, HomeFeedEntry> | undefined

    constructor(homeFeed:Map<string,any>){
        if(homeFeed != undefined){
            homeFeed.forEach((value, eventID:string)=>{


                if(groupMapUploadeByUserID in homeFeed.get(eventID))
                    if(this.homeFeed != undefined)
                        this.homeFeed.get(eventID)!.uploadedByUserID = homeFeed.get(eventID)[groupMapUploadeByUserID]
                    else this.homeFeed = new Map(Object.entries({eventID: new HomeFeedEntry().uploadedByUserID = homeFeed.get(eventID)[groupMapUploadeByUserID]}))
                else
                    console.error(groupMapUploadeByUserID + " of event: " +eventID + " has to be non-null")
                if(groupMapUploadedTimeStamp in homeFeed.get(eventID))
                    this.homeFeed!.get(eventID)!.uploadedTimeStamp = homeFeed.get(eventID)[groupMapUploadedTimeStamp]
                else
                    console.error(groupMapUploadedTimeStamp + " of event: " +eventID + " has to be non-null")
                if(groupMapParticipatingGroups in homeFeed.get(eventID))
                    this.homeFeed!.get(eventID)!.participatingGroups = homeFeed.get(eventID)[groupMapParticipatingGroups]
                else
                    console.error(groupMapParticipatingGroups + " of event: " +eventID + " has to be non-null")
                if(groupMapEventStartTimeStamp in homeFeed.get(eventID))
                    this.homeFeed!.get(eventID)!.eventStartTimeStamp = homeFeed.get(eventID)[groupMapEventStartTimeStamp]
                else
                    console.error(groupMapEventStartTimeStamp + " of event: " +eventID + " has to be non-null")
                if(groupMapEventEndTimeStamp in homeFeed.get(eventID))
                    this.homeFeed!.get(eventID)!.eventEndTimeStamp = homeFeed.get(eventID)[groupMapEventEndTimeStamp]
                else
                    console.error(groupMapEventEndTimeStamp + " of event: " +eventID + " has to be non-null")
        })
    }
    }
    pack():Object{
        let obj: {[key:string] : any} = {}
        if (this.homeFeed != undefined)
            this.homeFeed.forEach(( entry:HomeFeedEntry,key:string) => obj[key] = entry.pack())
        console.warn("homeFeed entry is empty")
        return obj
    }
}

class HomeFeedEntry{
    uploadedByUserID:string | undefined 
    uploadedTimeStamp: string | undefined
    participatingGroups: Array<string> | undefined
    eventStartTimeStamp: string | undefined
    eventEndTimeStamp:string | undefined

    pack() : Object{
        let obj : { [key:string] : any} ={}
        if(this.uploadedByUserID != undefined)
            obj[groupMapUploadeByUserID] = this.uploadedByUserID
        if(this.uploadedTimeStamp != undefined)
            obj[groupMapUploadedTimeStamp] = this.uploadedTimeStamp
        if(this.eventEndTimeStamp != undefined)
            obj[groupMapEventEndTimeStamp] = this.eventEndTimeStamp
        if(this.eventStartTimeStamp != undefined)
            obj[groupMapEventStartTimeStamp] = this.eventStartTimeStamp
        if(this.participatingGroups != undefined)
            obj[groupMapParticipatingGroups] = this.participatingGroups
        return obj
    }

}

class Priviledge{
    priviledge: Map<string, PriviledgeEntry> | undefined
    map!:Map<string,any>
    roles: Map<string,any> | undefined
    constructor(data:Map<string,any>, map:Map<string,any>, roles:Map<string, any> | null | undefined){
        this.map = map
        if((roles != null) && (roles != undefined))
            this.roles = roles
        if(data !== undefined){
            if(data.size == 0)
                this.priviledge = new Map<string,PriviledgeEntry>();
            else
            data.forEach((_value, userID:string)=>{
                let lmap:Map<string, any> = new Map(Object.entries(data.get(userID)))
                if(this.priviledge == undefined)
                   this.priviledge = new Map<string, PriviledgeEntry>(Object.entries({[userID]: new PriviledgeEntry(lmap, map)}))
                else this.priviledge.set(userID, new PriviledgeEntry(lmap, map))
                if(groupMapDisplayName in data.get(userID))
                    this.priviledge.get(userID)!.displayName = data.get(userID)[groupMapDisplayName]
                if(groupMapGroupJoinDate in data.get(userID))
                this.priviledge.get(userID)!.groupJoinDate = data.get(userID)[groupMapGroupJoinDate]
            })
        }else
            console.error("Priviledge has to be non-null")
    }
    pack() : Object{
        let obj : {[key:string] : any} = {}
        if(this.priviledge != undefined)
            this.priviledge.forEach((entry:PriviledgeEntry, key:string) => {
                obj[key] = Object(entry.userPack())
            })
        else console.warn("priviledge is empty")
        return obj
    }
    create(priviledgeEntryType:string, userID:string, displayName:string, location:string){
        let obj: {[key:string]: any} = {
            [groupMapPriviledgeEntryType]: priviledgeEntryType,
           [groupMapPriviledgeEntryName]: priviledgeEntryType,
            [groupMapPriviledgeEntryLocation] : location,
            [groupMapDisplayName]: displayName,
            [groupMapGroupJoinDate]: [new Date().toDateString()],
        }
        if(this.priviledge == undefined)
        console.error("Priviledge must be definded")
        else{
            this.priviledge.set(userID,new PriviledgeEntry(
                new Map(Object.entries(obj))
            , this.roles))
        }
    }
    update(priviledgeEntryType:string, userID:string, displayName:string, location:string){
        if(this.priviledge != undefined)
        this.priviledge.set(userID, new PriviledgeEntry(
            new Map(Object.entries({
                [groupMapPriviledgeEntryType]: priviledgeEntryType,
                [groupMapPriviledgeEntryLocation] : location,
                [groupMapDisplayName]: displayName,
                [groupMapGroupJoinDate]: this.priviledge.get(userID)?.groupJoinDate!.push(new Date().toDateString()),
            }))
        , this.map))
        else
            console.error("No user is registred for this group")
    }
    delete(userID:string){
        if(this.priviledge != undefined)
            this.priviledge.delete(userID)
        else console.error("No user is registred for this group")

    }
}

class PriviledgeEntry{
    //PriviledgeEntry
    priviledgeEntryType:string | undefined
    priviledgeEntryName:string | undefined
    priviledgeEntryLocation:string| undefined

    //User
    displayName:string | undefined
    groupJoinDate:Array<string> | undefined
 
    //Group
    groupSeeMembers:boolean | undefined
    groupSeeMembersDetails:boolean | undefined

    //Events
    eventTeleblitzRead:boolean | undefined
    eventTeleblitzEdit:boolean | undefined
    eventTeleblitzAnmelden:boolean | undefined
    evnetTeleblitzSeeParticipants:boolean | undefined 
    eventTeleblitzShare:boolean | undefined

    constructor(data?:Map<string,any>, map?:Map<string, PriviledgeEntry>){
        if((data !== undefined)&&(map !== undefined)){
            if(data.has(groupMapPriviledgeEntryLocation)){
                if(data.get(groupMapPriviledgeEntryLocation) == 'local'){
                    const str:string = data.get(groupMapPriviledgeEntryType)
                    
                    if(map.has(str)){
                        this.read(map.get(str))
                        this.mapRead(data)
                    }
                    else{
                        console.error("Role: "+ data.get(groupMapPriviledgeEntryType)+ " does not exists localy")
                    }
                        
                }else if(data.get(groupMapPriviledgeEntryLocation) == 'global')
                    console.error("groupMapPriviledgeEntryLocation = global not implemented error")
            }else
                console.error("groupMapPriviledgeEntryLocation cant be empty")
        }
    }
    rolePack():object{
        let obj:{[key:string]: any} = {}

        if(this.priviledgeEntryLocation != undefined)
            obj[groupMapPriviledgeEntryLocation] = this.priviledgeEntryLocation
        else console.error("PriviledgeEntry needs a location specification")
        if(this.priviledgeEntryName != undefined)
            obj[groupMapPriviledgeEntryName] = this.priviledgeEntryName
        else console.error("PriviledgeEntry needs a name")
        if(this.priviledgeEntryType != undefined)
            obj[groupMapPriviledgeEntryType] = this.priviledgeEntryType
        else console.error("PriviledgeEntry needs a type")

        if(this.groupSeeMembers != undefined)
            obj[groupMapPriviledgeEntrySeeMembers] = this.groupSeeMembers 
        if(this.groupSeeMembersDetails != undefined)
           obj[groupMapPriviledgeEntrySeeMembersDetails]  = this.groupSeeMembersDetails 

        
        if(this.eventTeleblitzRead != undefined)
           obj[eventTeleblitzRead]  = this.eventTeleblitzRead
        if(this.eventTeleblitzEdit != undefined)
            obj[eventTeleblitzEdit] = this.eventTeleblitzEdit 
        if(this.eventTeleblitzAnmelden != undefined)
            obj[eventTeleblitzEdit] = this.eventTeleblitzAnmelden 
        if(this.evnetTeleblitzSeeParticipants != undefined)
            obj[evnetTeleblitzSeeParticipants] = this.evnetTeleblitzSeeParticipants 
        if(this.eventTeleblitzShare != undefined)
            obj[eventTeleblitzShare] = this.eventTeleblitzShare

        return obj
    }
    userPack():object{
        let obj:{[key:string]: any} = {}

        if(this.priviledgeEntryLocation != undefined)
            obj[groupMapPriviledgeEntryLocation] = this.priviledgeEntryLocation
        else console.error("PriviledgeEntry needs a location specification")
        if(this.priviledgeEntryName != undefined)
            obj[groupMapPriviledgeEntryName] = this.priviledgeEntryName
        else console.error("PriviledgeEntry needs a name")
        if(this.priviledgeEntryType != undefined)
            obj[groupMapPriviledgeEntryType] = this.priviledgeEntryType
        else console.error("PriviledgeEntry needs a type")

        if(this.groupJoinDate != undefined)
           obj[groupMapGroupJoinDate]  = [...this.groupJoinDate]

        if(this.displayName != undefined)
            obj[groupMapDisplayName] = this.displayName

        return obj
    }
    mapRead(dataEntry:Map<string,any>) : PriviledgeEntry{
        if(dataEntry.has(groupMapPriviledgeEntryLocation))
            this.priviledgeEntryLocation = dataEntry.get(groupMapPriviledgeEntryLocation)
        if(dataEntry.has(groupMapPriviledgeEntryName))
            this.priviledgeEntryName = dataEntry.get(groupMapPriviledgeEntryName)
        if(dataEntry.has(groupMapPriviledgeEntryType))
            this.priviledgeEntryType = dataEntry.get(groupMapPriviledgeEntryType)
        if(dataEntry.has(groupMapPriviledgeEntrySeeMembers) )
            this.groupSeeMembers = dataEntry.get(groupMapPriviledgeEntrySeeMembers)
        if(dataEntry.has(groupMapPriviledgeEntrySeeMembersDetails))
            this.groupSeeMembersDetails = dataEntry.has(groupMapPriviledgeEntrySeeMembersDetails)
        if(dataEntry.has(groupMapGroupJoinDate)){
            if(this.groupJoinDate == undefined)
                this.groupJoinDate = new Array()
            this.groupJoinDate.push(...dataEntry.get(groupMapGroupJoinDate))
        }
            
        if(dataEntry.has(eventTeleblitzRead))
            this.eventTeleblitzRead = dataEntry.get(eventTeleblitzRead)
        if(dataEntry.has(eventTeleblitzShare))
            this.eventTeleblitzShare = dataEntry.get(eventTeleblitzShare)
        if(dataEntry.has(eventTeleblitzEdit))
            this.eventTeleblitzEdit = dataEntry.get(eventTeleblitzEdit)
        if(dataEntry.has(eventTeleblitzAnmelden))
            this.eventTeleblitzAnmelden = dataEntry.get(eventTeleblitzAnmelden)
        if(dataEntry.has(evnetTeleblitzSeeParticipants))
            this.evnetTeleblitzSeeParticipants = dataEntry.get(evnetTeleblitzSeeParticipants)
        return this

    }
    read(dataEntry:any):PriviledgeEntry{
        if(groupMapPriviledgeEntryLocation in dataEntry)
            this.priviledgeEntryLocation = dataEntry[groupMapPriviledgeEntryLocation]
        if(groupMapPriviledgeEntryName in dataEntry)
            this.priviledgeEntryName = dataEntry[groupMapPriviledgeEntryName];
        if(groupMapPriviledgeEntryType in dataEntry)
            this.priviledgeEntryType = dataEntry[groupMapPriviledgeEntryType]

        if(groupMapPriviledgeEntrySeeMembers in dataEntry)
            this.groupSeeMembers = dataEntry[groupMapPriviledgeEntrySeeMembers]
        if(groupMapPriviledgeEntrySeeMembersDetails in dataEntry)
            this.groupSeeMembersDetails = dataEntry[groupMapPriviledgeEntrySeeMembersDetails]
        if(groupMapGroupJoinDate in dataEntry)
            this.groupJoinDate = dataEntry[groupMapGroupJoinDate]
        if(eventTeleblitzRead in dataEntry)
            this.eventTeleblitzRead = dataEntry[eventTeleblitzRead]
        if(eventTeleblitzEdit in dataEntry)
            this.eventTeleblitzEdit = dataEntry[eventTeleblitzEdit]
        if(eventTeleblitzAnmelden in dataEntry)
            this.eventTeleblitzAnmelden = dataEntry[eventTeleblitzAnmelden]
        if(evnetTeleblitzSeeParticipants in dataEntry)
            this.evnetTeleblitzSeeParticipants = dataEntry[evnetTeleblitzSeeParticipants]
        if(eventTeleblitzShare in dataEntry)
            this.eventTeleblitzShare = dataEntry[eventTeleblitzShare]

        return this;
    }
}

class GroupOptions{
    groupUpperClass:Array<string> | undefined
    groupLowerHirarchyEntry: Map<string, GroupLowerHirarchyEntry> | undefined

    //Admin
    adminGroupMemberBrowser:boolean | undefined
    enableDisplayName:boolean | undefined

    //Events
    eventTeleblitzEnable:boolean | undefined

    //Chat
    chatEnable:boolean | undefined

    constructor(data:Map<string,any>){
        if (data !== undefined){
            if(data.has(groupMapGroupUpperClass))
                this.groupUpperClass = data.get(groupMapGroupUpperClass)
            if(data.has(groupMapGroupLowerClass))
                data.forEach((key:string, value:any)=>{
                    if(this.groupLowerHirarchyEntry != undefined)
                        this.groupLowerHirarchyEntry.set(key, new GroupLowerHirarchyEntry(value))
                    else this.groupLowerHirarchyEntry = new Map<string, GroupLowerHirarchyEntry>(Object.entries({key:new GroupLowerHirarchyEntry(data)}))})
            if(data.has(groupMapAdminGroupMemberBrowser))
                this.adminGroupMemberBrowser = data.get(groupMapAdminGroupMemberBrowser)
            if(data.has(groupMapEnableDisplayName))
                this.enableDisplayName = data.get(groupMapEnableDisplayName)
            if(data.has(groupMapEventTeleblitzEnable))
                this.eventTeleblitzEnable = data.get(groupMapEventTeleblitzEnable)
            if(data.has(groupMapChatEnable))
                this.chatEnable = data.get(groupMapChatEnable)
        }else
            console.error("GroupOptions has to be defined")
    }
    pack() : object{
        let obj:{ [key: string]: any } = {};

        if(this.groupUpperClass != undefined)
            obj[groupMapGroupUpperClass]= this.groupUpperClass
        if(this.groupLowerHirarchyEntry != undefined){
            let obj2:{ [obkey: string]: any } = {}
            this.groupLowerHirarchyEntry.forEach((value:GroupLowerHirarchyEntry, key:string, map)=>{
                obj2[key] = Object(value.pack())
            })
            obj[groupMapGroupLowerClass] = obj2
        }
        if(this.adminGroupMemberBrowser != undefined)
            obj[groupMapAdminGroupMemberBrowser] = this.adminGroupMemberBrowser
        if(this.enableDisplayName != undefined)
            obj[groupMapEnableDisplayName] = this.enableDisplayName
        if(this.eventTeleblitzEnable != undefined)
            obj[groupMapEventTeleblitzEnable] = this.eventTeleblitzEnable
        if(this.chatEnable != undefined)
            obj[groupMapChatEnable] = this.chatEnable
        return obj
    }
}

class GroupLicence{
    path!:string
    document!:string
    groupLicenceType!: GroupLicenceType

    constructor(data:any){
        if(data !== undefined)
            if(groupMapGroupLicenceType in data)
                switch (data[groupMapGroupLicenceType]) {
                    case groupMapGroupLienceTypePremium:
                        this.groupLicenceType = GroupLicenceType.premium;
                        break;
                    case groupMapGroupLienceTypeStandart:
                        this.groupLicenceType = GroupLicenceType.standart;
                        break;
                    case groupMapGroupLienceTypeAnarchy:
                        this.groupLicenceType = GroupLicenceType.anarchy;
                        break;
                    default:
                        this.groupLicenceType = GroupLicenceType.standart;
                }
            else
                console.error("key groupMapGroupLicenceType has to be in data")
        else
            console.error("data in groupLience has to be definded")
    }
    getLicence():string{
        switch(this.groupLicenceType){
            case GroupLicenceType.premium:
                return groupMapGroupLienceTypePremium
            case GroupLicenceType.standart:
                return groupMapGroupLienceTypeStandart
            case GroupLicenceType.anarchy:
                return groupMapGroupLienceTypeAnarchy
            default:
                return groupMapGroupLienceTypeStandart

        }
    }
    pack() : object{
        return {[groupMapGroupLicenceType] : this.getLicence()}
    }
}
class GroupLowerHirarchyEntry{
     groupID!: string
     groupNickName!: string

     constructor(data:any){
         if(data !== undefined){
            if(userMapgroupID in data)
                this.groupID = data[userMapgroupID]
            else
                console.error("GroupLowerHirachyEntry: groupID has to be definden")
            if(groupMapgroupNickName in data)
                this.groupNickName = data[groupMapgroupNickName]
            else
                console.error("GroupLowerHirachyEntry: groupMapgroupNickName has to be definden")
         }else
            console.error("GroupLowerHirarchyEntry: data has to be definded")

     }
     pack():object{
         let obj:{[key:string]:string} ={}
         obj[userMapgroupID] = this.groupID
         obj[groupMapgroupNickName] = this.groupNickName
         return obj
     }
}