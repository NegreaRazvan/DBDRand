import {Databases, Query, Client, ID} from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const getPaginatedBuilds = async (pageNumber) => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(15),
            Query.offset((pageNumber - 1) * 15),
            Query.orderDesc("date_created")
        ])
        return result.documents;
    } catch (error) {
        console.log(error)
    }
}

export const getCountBuilds = async () => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(1)
        ])
        return result.total;
    } catch (error) {
        console.log(error)
    }
}