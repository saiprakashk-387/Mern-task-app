export const base_url= "http://localhost:2000";
export const ACCESS_TOKEN = () => sessionStorage.getItem('token');

export function updateSessionInfo(value){
    let prevData = JSON.parse(sessionStorage.getItem('userdata'));
    Object.keys(value).forEach(function(val, key){
         prevData[val] = value[val];
    })
    sessionStorage.setItem('userdata', JSON.stringify(prevData));
    // window.location.reload()
}

// axios.defaults.baseURL = `http://localhost:3300/`;

// axios.defaults.headers.common = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// const authHeader = (token) => ({
//     ...(token && { Authorization: `Bearer ${token}` }),
//   });
  
// getApiwithAuth: async (url, accessToken) => {
//     // console.log("url",url);
//     const headers = authHeader(accessToken);
//     return await axios.get(url, {
//       headers: headers,
//     });
//   },
