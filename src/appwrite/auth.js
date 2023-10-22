import { Account, ID } from "appwrite";
import configEnv from "../config/ConfigEnv";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(configEnv.appWriteUrl)
      .setProject(configEnv.appWriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();

export default authService;
