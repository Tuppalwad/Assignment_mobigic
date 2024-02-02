import { Client, Storage, ID } from 'appwrite';

const END_POINT_URL = process.env.REACT_APP_ENDPOINT_URL;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;


const client = new Client();

client
    .setEndpoint(END_POINT_URL)
    .setProject(PROJECT_ID);

const storage = new Storage(client);

export  {storage,ID}