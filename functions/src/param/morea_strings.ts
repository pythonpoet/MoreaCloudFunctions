//Config

export const appVersion = "1";
export const configMapMinAppVerson = "minAppVersion";
export const configMapBlockedDevToken = "blockedDevTokens";

//Webflow
export const teleblitzapiurl =
  "https://api.webflow.com/collections/5be4a9a6dbcc0a24d7cb0ee9/items?api_version=1.0.0&access_token=d9097840d357b02bd934ba7d9c52c595e6940273e940816a35062fe99e69a2de";
export const woelfewebflowname = "Wombat (Wölfe)";
export const biberwebflowname = "Biber";
export const meitliwebflowname = "Nahani (Meitli)";
export const buebewebflowname = "Drason (Buebe)";

//groupID's
export const midatanamebiber = "3775";
export const midatanamewoelf = "3776";
export const midatanamemeitli = "3779";
export const midatanamebuebe = "4013";

//collection-paths for Firestore
export const pathEvents = "events";
export const pathGroups = "groups";
export const pathMessages = "messages";
export const pathUser = "user";
export const pathConfig = "config";
export const pathAnmeldungen = "Anmeldungen";
export const pathRequest = "request";
export const pathInit = "init";
export const pathChildren = "children";
export const pathPriviledge = "priviledge";

//Maps
export const mapTimestamp = "Timestamp";
//userMap
export const userMapUID = "UID";
export const userMapgroupID = "groupID";
export const userMapGroupIDs = "groupIDs";
export const userMapGroupEdditingAllow = "groupEdditingAllow";
export const userMapPfadiName = "Pfadinamen";
export const userMapNachName = "Nachname";
export const userMapVorName = "Vorname";
export const userMapPos = "Pos";
export const userMapMessagingGroups = "messageGroups";
export const userMapSubscribedGroups = "subscribedGroups";
export const userMapAlter = "Geburtstag";
export const userMapLeiter = "Leiter";
export const userMapTeilnehmer = "Teilnehmer";
export const userMapKinder = "Kinder";
export const userMapEltern = "Eltern";
export const userMapAdresse = "Adresse";
export const userMapPLZ = "PLZ";
export const userMapOrt = "Ort";
export const userMapHandynummer = "Handynummer";
export const userMapEmail = "Email";
export const userMapAccountCreated = "AccountCreated";
export const userMapDeviceToken = "devtoken";
export const userMapGeburtstag = "Geburtstag";
export const userMapAccountEdit = "edit";
export const userMapGeschlecht = "Geschlecht";
export const userMapChildUID = "childUID";

//groupMap
export const groupMapEventID = "eventID";
export const groupMapgroupNickName = "groupNickName";
export const groupMapSubgroup = "subgroups";
export const groupMapAktuellerTeleblitz = "AktuellerTeleblitz";
export const groupMapHomeFeed = "homeFeed";

export const groupMapUploadeByUserID = "uploadedByUserID";
export const groupMapUploadedTimeStamp = "uploadedTimeStamp";
export const groupMapParticipatingGroups = "participatingGroups";
export const groupMapEventStartTimeStamp = "eventStartTimeStamp";
export const groupMapEventEndTimeStamp = "eventEndTimeStamp";
export const groupMapGroupOption = "groupOption";
export const groupMapGroupUpperClass = "groupMapGroupUpperClass";
export const groupMapGroupLowerClass = "groupMapGroupLowerClass";
export const groupMapGroupLicence = "groupLicence";
export const groupMapGroupLicenceType = "groupMapGroupLicenceType";
export const groupMapGroupLienceTypePremium = "groupMapGroupLienceTypePremium";
export const groupMapGroupLienceTypeStandart = "groupMapGroupLienceTypeStandart";
export const groupMapGroupLienceTypeAnarchy = "groupMapGroupLienceTypeAnarchy";
export const groupMapAdminGroupMemberBrowser = "groupMapAdminGroupMemberBrowser";
export const groupMapEnableDisplayName = "groupMapEnableDisplayName";
export const groupMapEventTeleblitzEnable = "groupMapEventTeleblitzEnable";
export const groupMapChatEnable = "groupMapChatEnable";
export const groupMapGroupLicencePath = "groupMapGroupLicencePath";
export const groupMapGroupLicenceDocument = "groupMapGroupLicenceDocument";

// GroupMap -> PriviledgeEntry
export const groupMapPriviledgeEntryCustomInfo = "customInfo";
export const groupMapPriviledgeEntryType = "roleType";
export const groupMapPriviledgeEntryName = "roleName";
export const groupMapDisplayName = "displayName";
export const groupMapGroupJoinDate = "groupJoinDate";

export const groupMapPriviledgeEntrySeeMembers = "groupMapPriviledgeEntrySeeMembers";
export const groupMapPriviledgeEntrySeeMembersDetails = "groupMapPriviledgeEntrySeeMembersDetails";
export const eventTeleblitzRead = "eventTeleblitzRead";
export const eventTeleblitzShare = "eventTeleblitzShare";
export const evnetTeleblitzSeeParticipants = "evnetTeleblitzSeeParticipants";
export const eventTeleblitzAnmelden = "eventTeleblitzAnmelden";
export const eventTeleblitzEdit = "eventTeleblitzEdit";
export const groupMapPriviledgeEntryLocation = "roleLocation";
export const groupMapRoles = "roles";

//eventMap
export const eventMapAnmeldeStatusNegativ = "ChuntNoed";
export const eventMapAnmeldeStatusPositiv = "Chunt";
export const eventMapAnmeldeUID = "AnmeldeUID";
export const eventMapType = "TeleblitzType";

//Teleblitz
export const tlbzMapLoading = "Loading";
export const tlbzMapNoElement = "noElement";
export const tlbzMapTeleblitzType = "TeleblitzType";
export const tlbzMapArchived = "_archived";
export const tlbzMapDraft = "_draft";
export const tlbzMapAntreten = "antreten";
export const tlbzMapAbtreten = "abtreten";
export const tlbzMapBemerkung = "bemerkung";
export const tlbzMapDatum = "datum";
export const tlbzMapEndeFerien = "ende-ferien";
export const tlbzMapFerien = "ferien";
export const tlbzMapGoogleMaps = "google-map";
export const tlbzMapGrund = "grund";
export const tlbzMapKeineAktivitaet = "keine-aktivitat";
export const tlbzMapMapAbtreten = "map-abtreten";
export const tlbzMapMitnehmenTest = "mitnehmen-test";
export const tlbzMapName = "name";
export const tlbzMapNameDesSenders = "name-des-senders";
export const tlbzMapSlug = "slug";
export const tlbzMapGroupIDs = "groupIDs";

//Keys der Map der Navigation
export const signedOut = "signedOut";
export const signedIn = "signedIn";
export const toHomePage = "homePage";
export const toMessagePage = "messagePage";
export const toAgendaPage = "agendaPage";
export const toProfilePage = "profilePage";

//MailChimp
export const urlInfoMailListMembers = "https://us13.api.mailchimp.com/3.0/lists/54c3988cea/members/";
export const uIDInfoMailList = "54c3988cea";
