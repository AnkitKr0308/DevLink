import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

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
    try {
      return await this.databases.createDocument(
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
}

const appwriteservice = new AppWriteService();

export default appwriteservice;
