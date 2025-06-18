import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);

    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        return await this.login(email, password);
      }
    } catch (error) {
      console.error("Error creating Account", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging user", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Error logging out user", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error fetching user detail:", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;
