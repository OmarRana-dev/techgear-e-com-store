import appwriteConfig from "../utils/appwriteConfig";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appwrite_URL)
      .setProject(appwriteConfig.appwrite_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createStore({
    storeName,
    ownerId,
    storeLogoImage,
    tagline,
    description,
  }) {
    try {
      const response = await this.databases.createDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_STORES_COLLECTION_ID,
        ID.unique(),
        {
          storeName,
          ownerId,
          storeLogoImage,
          description,
          tagline,
        },
        [
          // Permissions for the store document
          Permission.read(Role.any()), // Anyone can view the store
          Permission.update(Role.user(ownerId)), // Only the store owner can update
          Permission.delete(Role.user(ownerId)), // Only the store owner can delete
        ]
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // cashOnDelivery,
  // returnPolicy,
  // warranty,
  async addProduct({
    productName,
    price,
    description,
    storeId,
    ownerId,
    category,
    quantity,
    productImage,
  }) {
    try {
      const response = await this.databases.createDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_PRODUCTS_COLLECTION_ID,
        ID.unique(),
        {
          productName,
          price,
          description,
          storeId,
          ownerId,
          category,
          quantity,
          productImage,
        },
        [
          // Anyone can view the product
          Permission.read(Role.any()),
          // Only the store owner can update and delete the product
          Permission.update(Role.user(ownerId)),
          Permission.delete(Role.user(ownerId)),
        ]
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateStore(DocumentID, { storeName, StoreLogoImage }) {
    try {
      const response = await this.databases.updateDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_STORES_COLLECTION_ID,
        DocumentID,
        {
          storeName,
          StoreLogoImage,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(
    DocumentID,
    {
      productName,
      price,
      description,
      quantity,
      productImages,
      cashOnDelivery,
      returnPolicy,
      warranty,
    }
  ) {
    try {
      const response = await this.databases.updateDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_PRODUCTS_COLLECTION_ID,
        DocumentID,
        {
          productName,
          price,
          description,
          quantity,
          productImages,
          cashOnDelivery,
          returnPolicy,
          warranty,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteStore(DocumentID) {
    try {
      const response = await this.databases.deleteDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_STORES_COLLECTION_ID,
        DocumentID
      );

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePruduct(DocumentID) {
    try {
      const response = await this.databases.deleteDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_PRODUCTS_COLLECTION_ID,
        DocumentID
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getStore(DocumentID) {
    try {
      const response = await this.databases.getDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_STORES_COLLECTION_ID,
        DocumentID
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProduct(DocumentID) {
    try {
      const response = await this.databases.getDocument(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_PRODUCTS_COLLECTION_ID,
        DocumentID
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getStores(ownerId) {
    try {
      const response = await this.databases.listDocuments(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_STORES_COLLECTION_ID,
        [Query.equal("ownerId", ownerId)]
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts(queries) {
    try {
      const response = await this.databases.listDocuments(
        appwriteConfig.appwrite_DATABASE_ID,
        appwriteConfig.appwrite_PRODUCTS_COLLECTION_ID,
        queries
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        appwriteConfig.appwrite_BUCKET_ID,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.storage.deleteFile(
        appwriteConfig.appwrite_BUCKET_ID,
        fileId
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getFilePreview(fileId) {
    const response = this.storage.getFilePreview(
      appwriteConfig.appwrite_BUCKET_ID,
      fileId
    );
    return response;
  }
}

const appwriteService = new Service();
export default appwriteService;
