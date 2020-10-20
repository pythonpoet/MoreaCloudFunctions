import {  groupMapDisplayName, groupMapGroupJoinDate, groupMapPriviledgeEntryCustomInfo, groupMapPriviledgeEntryLocation, groupMapPriviledgeEntryType } from "../param/morea_strings"

export class PriviledgeEntry{
    //PriviledgeEntry
    roleType :string | undefined
    roleLocation :string| undefined

    //User
    displayName:string | undefined
    groupJoinDate:Array<string> | undefined

    //Custom
    customInfo:object | undefined
 
    

    constructor(data:any | undefined){
        if(data != undefined){
            if(groupMapPriviledgeEntryLocation in data)
                this.roleLocation = data[groupMapPriviledgeEntryLocation]
            else console.warn("PriviledgeEntry needs a ", groupMapPriviledgeEntryLocation)
            if(groupMapPriviledgeEntryType in data)
                this.roleType = data[groupMapPriviledgeEntryType]
            else console.warn("PriviledgeEntry needs a ", groupMapPriviledgeEntryType)
            if(groupMapGroupJoinDate in data)
                this.groupJoinDate = data[groupMapGroupJoinDate]
            else console.warn("PriviledgeEntry needs a ", groupMapGroupJoinDate)
            if(groupMapDisplayName in data)
                this.displayName = this.displayName 
            else console.warn("PriviledgeEntry needs a ", groupMapDisplayName)
            if(groupMapPriviledgeEntryCustomInfo in data)
                this.customInfo = data[groupMapPriviledgeEntryCustomInfo]
            else console.warn("PriviledgeEntry needs a ", groupMapPriviledgeEntryCustomInfo)
        }
    }

    create(roleType:string, roleLoacation:string, customInfo:object, displayName:string){
        this.roleType = roleType
        this.roleLocation = roleLoacation
        this.customInfo = customInfo
        this.displayName = displayName
        this.groupJoinDate = [new Date().toDateString()]
    }
    update(roleType:string | undefined,  roleLoacation:string | undefined, customInfo:object | undefined, displayName:string | undefined){
        if(roleType != undefined)
            this.roleType = roleType
        if(roleLoacation != undefined)
            this.roleLocation = roleLoacation
        if(customInfo != undefined)
            this.customInfo = customInfo
        if(displayName != undefined)
            this.displayName = displayName
        
        this.groupJoinDate!.push(new Date().toDateString())
    }
    validate():boolean{
        console.log("this: ", this)
        if(!(groupMapPriviledgeEntryLocation in this)){
            console.warn("PriviledgeEntry needs a ", groupMapPriviledgeEntryLocation)
            return false
        }
        if(!(groupMapPriviledgeEntryType in this)){
            console.warn("PriviledgeEntry needs a ", groupMapPriviledgeEntryType)
            return false
        }
        if(!(groupMapGroupJoinDate in this)){
            console.warn("PriviledgeEntry needs a ", groupMapGroupJoinDate)
            return false
        }
        if(!(groupMapDisplayName in this)){
            console.warn("PriviledgeEntry needs a ", groupMapDisplayName)
            return false
        }
        if(!(groupMapPriviledgeEntryCustomInfo in this)){
            console.warn("PriviledgeEntry needs a ",groupMapPriviledgeEntryCustomInfo)
            return false
        }
        return true
    }
    pack():object{
        return JSON.parse(JSON.stringify(this))
    }
    
}

