const BASE_URL = process.env.REACT_APP_SERVER_URL;

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

export const login = (email, password) => {
  return fetchApi("login", { Email: email, Password: password });
};

export const checkUser = (section_token) => {
  return fetchApi("checkuser", { section_token });
};

export const logout = (section_token) => {
  return fetchApi("logout", { section_token });
};

export const register = (Email, Password, Name) => {
  return fetchApi("register", { Email:Email, Password:Password, Name:Name});
};


export const username = (section_token) => {
  return fetchApi("getusername", { section_token:section_token });
};