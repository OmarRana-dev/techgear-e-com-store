import appwriteConfig from "../utils/appwriteConfig";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appwrite_URL)
      .setProject(appwriteConfig.appwrite_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const response = await this.account.create(
        ID.unique(), // Generate a unique ID for the user
        email,
        password,
        name
      );
      // console.log("User registered successfully:", response);
      return response;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw new Error(error.message);
    }
  }

  async promoteToBuyer() {
    try {
      const user = await this.getCurrentUser();
      if (!user) throw new Error("No user logged in");

      await this.account.updatePrefs({ role: "buyer" });
      // console.log("User promoted to buyer");
    } catch (error) {
      console.error("Error promoting user to buyer:", error.message);
      throw new Error(error.message);
    }
  }

  async promoteToSeller() {
    try {
      const user = await this.getCurrentUser();
      if (user.prefs.role === "buyer") {
        await this.account.updatePrefs({ role: "seller" });
        // console.log("User promoted to seller");
      } else if (user.prefs.role === "seller") {
        return "alreadySeller";
        // console.log("User already a seller");
      }
    } catch (error) {
      console.error("Error promoting user to seller:", error.message);
      throw new Error(error.message);
    }
  }

  async promoteToAdmin() {
    try {
      const user = await this.getCurrentUser();
      if (!user) throw new Error("No user logged in");

      await this.account.updatePrefs({ role: "admin" });
      // console.log("User promoted to admin");
    } catch (error) {
      console.error("Error promoting user to admin:", error.message);
      throw new Error(error.message);
    }
  }

  async login({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      // Logged in
      return user;
    } catch (error) {
      //   console.log("No active session:", error.message);
      return false; // Return null if no user is logged in
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const authService = new AuthService();
export default authService;
