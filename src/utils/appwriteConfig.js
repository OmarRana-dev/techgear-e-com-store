const appwriteConfig = {
  appwrite_URL: String(import.meta.env.VITE_APPWRITE_URL),
  appwrite_PROJECT_ID: String(
    import.meta.env.VITE_APPWRITE_PROJECT_ID
  ),
  appwrite_DATABASE_ID: String(
    import.meta.env.VITE_APPWRITE_DATABASE_ID
  ),
  appwrite_STORES_COLLECTION_ID: String(
    import.meta.env.VITE_APPWRITE_STORES_COLLECTION_ID
  ),
  appwrite_PRODUCTS_COLLECTION_ID: String(
    import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID
  ),
  appwrite_BUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default appwriteConfig;
