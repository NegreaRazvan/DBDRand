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

export const saveBuild = async (addOns, item, perks, offering, description,username, youtube, role) => {
    let errors = '';

    if (!username) errors += 'User name is required.\n';
    if (!addOns[0]?.addOn) errors += 'Add-on 1 is required.\n';
    if (!addOns[1]?.addOn) errors += 'Add-on 2 is required.\n';
    if (!offering?.offering) errors += 'Offering is required.\n';
    if (!item?.item) errors += 'Power/Item is required.\n';
    if (!perks[0]?.perk) errors += 'Perk 1 is required.\n';
    if (!perks[1]?.perk) errors += 'Perk 2 is required.\n';
    if (!perks[2]?.perk) errors += 'Perk 3 is required.\n';
    if (!perks[3]?.perk) errors += 'Perk 4 is required.\n';

    if (errors) {
        throw new Error(errors.trim());
    }

    console.log((new Date()).toISOString());

    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        character_name: item.characterName,
        character_picture: item.characterPortrait,
        user_name: username,
        build_description: description,
        add_on_1_picture: addOns[0].addOn,
        add_on_1_rarity: addOns[0].rarity,
        add_on_2_picture: addOns[1].addOn,
        add_on_2_rarity: addOns[1].rarity,
        date_created: (new Date()).toISOString(),
        offering_picture: offering.offering,
        offering_rarity: offering.rarity,
        power_picture: item.item,
        role: role,
        perk_1_picture: perks[0].perk,
        perk_2_picture: perks[1].perk,
        perk_3_picture: perks[2].perk,
        perk_4_picture: perks[3].perk,
    });
}