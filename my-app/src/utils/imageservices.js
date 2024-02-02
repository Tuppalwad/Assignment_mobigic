import { storage,ID } from "./appwrite";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const STORAGE_ID=process.env.REACT_APP_STORAGE_ID;
const fetchApi = (route, data, method = "POST") => {
  const url = `${BASE_URL}/${route}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const options = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((responseData) => responseData)
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};


export const addimage = (section_token, images) => {
  console.log(section_token, images)

    return fetchApi("addimage", { section_token, images });
}


export const removeimage = (section_token, imageID) => {
    return fetchApi("removeimage", { section_token, imageID });
}

export const handleUpload = async (file) => {
    if (!file) {
        console.error('No file selected for upload');
        return;
    }
    try {
        const response = await storage.createFile(STORAGE_ID, ID.unique(), file);
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}


export const imaglist = (section_token) => {
    return fetchApi("getimagelist", { section_token: section_token});
}

export const imageurl = async(id) => {
  try {
    const response = await storage.getFilePreview("65bc8d61c55ee98c97d2", id);
    return response
} catch (error) {
    console.error(error);
}
}