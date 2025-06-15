const conf = {
  appwriteurl: String(process.env.REACT_APP_APPWRITE_URL),
  appwriteprojectid: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
  appwriteLinkCollectionId: String(
    process.env.REACT_APP_APPWRITE_LINK_COLLECTION_ID
  ),
  appwriteSupportCollectionId: String(
    process.env.REACT_APP_APPWRITE_SUPPORT_COLLECTION_ID
  ),
  LinkApiGetUser: String(`${process.env.REACT_APP_DEVLINK_LINK_API_BASE_URL}`),
  SupportApi: String(`${process.env.REACT_APP_SUPPORT_API_BASE_URL}`),
};

export default conf;
