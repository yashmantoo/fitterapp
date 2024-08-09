import { Client, Account, Databases } from "appwrite";
const client = new Client()
client
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject("65d2f3eccff42bf7469a")

export const account = new Account(client)
export const databases = new Databases(client)