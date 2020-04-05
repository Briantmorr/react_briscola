import axios from 'axios';

const parseJSON = function(response) {
  if(response.status >= 400) {
    throw new Error(response.status);
  }

  return response.text().then(function(text) {
    return text ? JSON.parse(text) : null;
  });
};

export const API = {
  URL: "http://localhost:8000",
  AUTH: {
    // setSessionToken(url) {
    // // add session token
    // const session_token = Cookie.get('session_token');
    // if(!session_token) {
    //   navigate('/login');
    // }
    // return url + '?session_token=' + session_token;
    // }
  },
  Login: {
    getUser: function(groupId) {
    //   const url = `${API.URL}/implementationgroup${groupId ? "/" + groupId : ""}`; 
    //   return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    },
    createUser: function(groupId) {
    //   const url = `${API.URL}/group/${groupId}/nextquestion`;
    //   return fetch(API.AUTH.setSessionToken(url)).then(parseJSON);
    },
    GuestName: function() {
      const url = `${API.URL}/guest_name`;
      // axios.defaults.headers.common['cont']
      return axios.get(url);
      // return fetch(url).then(parseJSON);
    }
  },
  Test: {
      test: function() {
          return fetch(API.URL + "/test").then(parseJSON)
      }
  }
 
};
