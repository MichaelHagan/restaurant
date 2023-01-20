import axios from "axios";

export const authProvider = {
    // called when the user attempts to log in
    login: async({ email, password }) =>  {
      await axios.post('http://localhost:3050/admins/login', {
        email,
        password
      })
      .then(response => {
        //Seems this if statement can be removed, check on it
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.data);
        }
        localStorage.setItem('auth', response.data.accessToken);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('super',response.data.super);
        return Promise.resolve();
    })
    .catch((e) => {
        throw new Error(e.response.data)
    });
    },
    // called when the user clicks on the logout button
    logout: () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("name");
      localStorage.removeItem("super");
      return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
      if (status === 401 || status === 403) {
        localStorage.removeItem("auth");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
      return localStorage.getItem("auth")
        ? Promise.resolve()
        : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
  };