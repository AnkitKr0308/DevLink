const conf = {
  appwriteurl: String(process.env.REACT_APP_APPWRITE_URL),
  appwriteprojectid: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
  appwritedatabaseid: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
  appwritecollectionid: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
};

export default conf;
