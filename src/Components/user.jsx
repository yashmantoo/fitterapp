import { ID } from "appwrite";
import { account, databases } from "../appwrite/appwrite";

export const login = async(email, password) => {
    try {
        const loggedin = await account.createEmailSession(email, password)
        console.log(loggedin)
        return loggedin
    } catch (error) {
        console.log(error)
    }
    
}



export const register = async(email, password, phone) => {
    try {
        const res = await account.create(phone, email, password)
        return res
    } catch (error) {
        throw error
    }
    
}

export const getUser = async() => {
    try {
        return await account.get()
    } catch (error) {
        return null
    }
    
}

export const logout = async() => {
    try {
        await account.deleteSessions()
    } catch (error) {
        console.log(error)
    }
}

const DATABASE_ID = "660e556ea0d0b285d356"
const COLLECTION_ID = "660e5642b61cf4524d75"

export const createDatabase = async(email, name, gender, age, height, weight) => {
    try {
        const res = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            email,
            name, 
            gender,
            age,
            height,
            weight
        )
        return res
    } catch (error) {
        console.log(error)
    }
}


