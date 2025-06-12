import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import authservice from "./auth";
import getCurrentDateTime from "../components/Date";

export class AppWriteService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);

    this.databases = new Databases(this.client);
  }

  async createPost({ URL, Title, Description, Date, Tags, userId }) {
    const user = await authservice.getCurrentUser();
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        ID.unique(),

        {
          URL,
          Title,
          Description,
          Date: getCurrentDateTime(),
          Tags,
          userId: user.$id,
        }
      );
    } catch (error) {
      console.log("Error creating details", error);
    }
  }

  async updatePost(ID, { URL, Title, Description, Date, Tags, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
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
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        ID.unique()
      );
      return true;
    } catch (error) {
      console.error("Error deleting post", error);
      throw error;
    }
  }

  async fetchDetails() {
    const user = await authservice.getCurrentUser();
    const userId = user.$id;

    try {
      await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Error fetching details", error);
      throw error;
    }
  }
}

const appwriteservice = new AppWriteService();

export default appwriteservice;
