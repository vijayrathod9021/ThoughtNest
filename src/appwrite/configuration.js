import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client();

    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                    slug
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(
        documentId,
        { title, content, slug, featuredImage, status, userID }
    ) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                documentId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                    slug
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost({ slug }) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
        } catch (error) {
            throw error
        }
    }

    async getMyPosts(userID) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                [
                    Query.equal("userID", userID)
                ]
            )
        } catch (error) {
            throw error;
        }
    }



    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            throw error;
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            config.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service();

export default service;