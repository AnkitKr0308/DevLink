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
};

export default conf;
