import axios from "axios";

export const authProvider = {
  // called when the user attempts to log in
  login: async ({ emailorphone, password }) => {
    try {
      let isnum = /^[+]?\d+$/.test(emailorphone); //TODO: Add handler for 233 instances
      let res = isnum
        ? await axios.post("http://localhost:3050/admins/login", {
            number: emailorphone,
            password,
          })
        : await axios.post("http://localhost:3050/admins/login", {
            email: emailorphone,
            password,
          });

      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.data);
      }

      localStorage.setItem("auth", res.data.accessToken);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("super", res.data.super);
      return Promise.resolve();
    } catch (e) {
      console.log(e.message);
    }
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
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
  // called to retrieve the user's identity
  getIdentity: () => {
    try {
      const name = localStorage.getItem("name");
      const superAdmin = localStorage.getItem("super");
      return Promise.resolve({
        name,
        superAdmin: superAdmin === "true",
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};