import {Databases, Query, Client, ID} from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const getPaginatedBuilds = async (pageNumber, role , killerSelected) => {
    try{
        console.log(killerSelected)
        const queries = [
            Query.limit(15),
            Query.offset((pageNumber - 1) * 15),
            Query.orderDesc("date_created"),
            Query.equal('role', role),
        ]


        if(killerSelected)
            queries.push(Query.equal('character_name', killerSelected))

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
        return result.documents;
    } catch (error) {
        console.log(error)
    }
}

export const getCountBuilds = async (role, killerSelected) => {
    try{
        const queries = [
            Query.limit(1),
            Query.equal('role', role)
        ]
        if(killerSelected)
            queries.push(Query.equal('character_name', killerSelected))

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
        return result.total;
    } catch (error) {
        console.log(error)
    }
}