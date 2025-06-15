import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";
import authservice from "./auth";
// import getCurrentDateTime from "../components/Date";

export class AppWriteService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);

    this.databases = new Databases(this.client);
  }

  // async createPost({ URL, Title, Description, Date, Tags, userId }) {
  //   const user = await authservice.getCurrentUser();
  //   try {
  //     return await this.databases.createDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteLinkCollectionId,
  //       ID.unique(),

  //       {
  //         URL,
  //         Title,
  //         Description,
  //         Date: getCurrentDateTime(),
  //         Tags,
  //         userId: user.$id,
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Error creating details", error);
  //   }
  // }

  async updatePost(ID, { URL, Title, Description, Date, Tags, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLinkCollectionId,
        ID.unique(),
        {
          URL,
          Title,
          Description,
          Date,
          Tags,
          userId,
        }
      );
    } catch (error) {
      console.error("Error updating details", error);
    }
  }

  async deletePost(ID) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLinkCollectionId,
        ID.unique()
      );
      return true;
    } catch (error) {
      console.error("Error deleting post", error);
      throw error;
    }
  }

  // async fetchDetails() {
  //   const user = await authservice.getCurrentUser();
  //   const userId = user.$id;

  //   try {
  //     return await this.databases.listDocuments(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteLinkCollectionId,
  //       [Query.equal("userId", userId)]
  //     );
  //   } catch (error) {
  //     console.error("Error fetching details", error);
  //     throw error;
  //   }
  // }

  async createSupport({
    Name,
    EmailAddress,
    Contact,
    Issue,
    SupportID,
    userID,
  }) {
    const user = await authservice.getCurrentUser();
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteSupportCollectionId,
        ID.unique(),
        {
          Name,
          EmailAddress: EmailAddress || user?.email || "",
          Contact,
          Issue,
          SupportID: ID.unique(),
          userID: userID || user?.$id || "",
        }
      );
    } catch (error) {
      console.error("Error creating support request", error);
      throw error;
    }
  }
}

const appwriteservice = new AppWriteService();

export default appwriteservice;
