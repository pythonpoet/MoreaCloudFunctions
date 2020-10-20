//Config

export const  appVersion:string = "1";
export const  configMapMinAppVerson:string = "minAppVersion";
export const  configMapBlockedDevToken:string = "blockedDevTokens";

//Webflow
export const  teleblitzapiurl:string =
    'https://api.webflow.com/collections/5be4a9a6dbcc0a24d7cb0ee9/items?api_version=1.0.0&access_token=d9097840d357b02bd934ba7d9c52c595e6940273e940816a35062fe99e69a2de';
export const  woelfewebflowname:string = 'Wombat (Wölfe)';
export const  biberwebflowname:string = 'Biber';
export const  meitliwebflowname:string = 'Nahani (Meitli)';
export const  buebewebflowname:string = 'Drason (Buebe)';

//groupID's
export const  midatanamebiber:string = '3775';
export const  midatanamewoelf:string = '3776';
export const  midatanamemeitli:string = '3779';
export const  midatanamebuebe:string = '4013';

//collection-paths for Firestore
export const  pathEvents:string = "events";
export const  pathGroups:string = "groups";
export const  pathMessages:string = "messages";
export const  pathUser:string = "user";
export const  pathConfig:string = "config";
export const  pathAnmeldungen:string = "Anmeldungen";
export const  pathRequest:string = "request";
export const  pathInit:string = "init";
export const  pathChildren:string = "children";
export const  pathPriviledge:string = "priviledge";

//Maps
export const  mapTimestamp:string = "Timestamp";
//userMap
export const  userMapUID:string = "UID";
export const  userMapgroupID:string = "groupID";
export const  userMapGroupIDs:string = "groupIDs";
export const  userMapGroupEdditingAllow:string = "groupEdditingAllow";
export const  userMapPfadiName:string = "Pfadinamen";
export const  userMapNachName:string = "Nachname";
export const  userMapVorName:string = "Vorname";
export const  userMapPos:string = "Pos";
export const  userMapMessagingGroups:string = "messageGroups";
export const  userMapSubscribedGroups:string = "subscribedGroups";
export const  userMapAlter:string = "Geburtstag";
export const  userMapLeiter:string = "Leiter";
export const  userMapTeilnehmer:string = "Teilnehmer";
export const  userMapKinder:string = "Kinder";
export const  userMapEltern:string = "Eltern";
export const  userMapAdresse:string = "Adresse";
export const  userMapPLZ:string = "PLZ";
export const  userMapOrt:string = "Ort";
export const  userMapHandynummer:string = "Handynummer";
export const  userMapEmail:string = "Email";
export const  userMapAccountCreated:string = "AccountCreated";
export const  userMapDeviceToken:string = "devtoken";
export const  userMapGeburtstag:string = "Geburtstag";
export const  userMapAccountEdit:string = "edit";
export const  userMapGeschlecht:string = 'Geschlecht';
export const  userMapChildUID:string = 'childUID';

//groupMap
export const  groupMapEventID:string = "eventID";
export const  groupMapgroupNickName:string = "groupNickName";
export const  groupMapSubgroup:string = "subgroups";
export const  groupMapAktuellerTeleblitz:string = "AktuellerTeleblitz";
export const  groupMapHomeFeed:string = "homeFeed";

export const  groupMapUploadeByUserID:string = "uploadedByUserID";
export const  groupMapUploadedTimeStamp:string = "uploadedTimeStamp";
export const  groupMapParticipatingGroups:string = "participatingGroups";
export const  groupMapEventStartTimeStamp:string = "eventStartTimeStamp";
export const  groupMapEventEndTimeStamp:string = "eventEndTimeStamp";
export const  groupMapGroupOption:string = "groupOption";
export const  groupMapGroupUpperClass:string = "groupMapGroupUpperClass";
export const  groupMapGroupLowerClass:string = "groupMapGroupLowerClass";
export const  groupMapGroupLicence:string = "groupLicence";
export const  groupMapGroupLicenceType:string = "groupMapGroupLicenceType";
export const  groupMapGroupLienceTypePremium:string = "groupMapGroupLienceTypePremium";
export const  groupMapGroupLienceTypeStandart:string = "groupMapGroupLienceTypeStandart";
export const  groupMapGroupLienceTypeAnarchy:string = "groupMapGroupLienceTypeAnarchy";
export const  groupMapAdminGroupMemberBrowser:string = "groupMapAdminGroupMemberBrowser";
export const  groupMapEnableDisplayName:string = "groupMapEnableDisplayName";
export const  groupMapEventTeleblitzEnable:string = "groupMapEventTeleblitzEnable";
export const  groupMapChatEnable:string = "groupMapChatEnable";
export const  groupMapGroupLicencePath:string = "groupMapGroupLicencePath";
export const  groupMapGroupLicenceDocument:string = "groupMapGroupLicenceDocument";

// GroupMap -> PriviledgeEntry
export const  groupMapPriviledgeEntryCustomInfo:string = 'customInfo';
export const  groupMapPriviledgeEntryType:string = "roleType";
export const  groupMapPriviledgeEntryName:string = "roleName";
export const  groupMapDisplayName:string = "displayName";
export const  groupMapGroupJoinDate:string = "groupJoinDate";

export const  groupMapPriviledgeEntrySeeMembers:string ="groupMapPriviledgeEntrySeeMembers";
export const  groupMapPriviledgeEntrySeeMembersDetails:string = "groupMapPriviledgeEntrySeeMembersDetails"
export const  eventTeleblitzRead:string = "eventTeleblitzRead"
export const  eventTeleblitzShare:string = "eventTeleblitzShare"
export const  evnetTeleblitzSeeParticipants:string = "evnetTeleblitzSeeParticipants"
export const  eventTeleblitzAnmelden:string = "eventTeleblitzAnmelden"
export const  eventTeleblitzEdit:string = "eventTeleblitzEdit"
export const  groupMapPriviledgeEntryLocation:string = "roleLocation";
export const  groupMapRoles:string = "roles";

//eventMap
export const  eventMapAnmeldeStatusNegativ:string = "ChuntNoed";
export const  eventMapAnmeldeStatusPositiv:string = "Chunt";
export const  eventMapAnmeldeUID:string = "AnmeldeUID";
export const  eventMapType:string = "TeleblitzType";

//Teleblitz
export const  tlbzMapLoading:string = "Loading";
export const  tlbzMapNoElement:string = "noElement";
export const  tlbzMapTeleblitzType:string = "TeleblitzType";
export const  tlbzMapArchived:string = "_archived";
export const  tlbzMapDraft:string = "_draft";
export const  tlbzMapAntreten:string = "antreten";
export const  tlbzMapAbtreten:string = "abtreten";
export const  tlbzMapBemerkung:string = "bemerkung";
export const  tlbzMapDatum:string = "datum";
export const  tlbzMapEndeFerien:string = "ende-ferien";
export const  tlbzMapFerien:string = "ferien";
export const  tlbzMapGoogleMaps:string = "google-map";
export const  tlbzMapGrund:string = "grund";
export const  tlbzMapKeineAktivitaet:string = "keine-aktivitat";
export const  tlbzMapMapAbtreten:string = "map-abtreten";
export const  tlbzMapMitnehmenTest:string = "mitnehmen-test";
export const  tlbzMapName:string = "name";
export const  tlbzMapNameDesSenders:string = "name-des-senders";
export const  tlbzMapSlug:string = "slug";
export const  tlbzMapGroupIDs:string = "groupIDs";


//Keys der Map der Navigation
export const  signedOut:string = 'signedOut';
export const  signedIn:string = 'signedIn';
export const  toHomePage:string = 'homePage';
export const  toMessagePage:string = 'messagePage';
export const  toAgendaPage:string = 'agendaPage';
export const  toProfilePage:string = 'profilePage';

//MailChimp
export const  urlInfoMailListMembers:string =
    'https://us13.api.mailchimp.com/3.0/lists/54c3988cea/members/';
export const  uIDInfoMailList:string = '54c3988cea';

