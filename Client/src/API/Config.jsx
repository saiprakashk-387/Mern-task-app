export const base_url = "http://localhost:2050";
// export const base_url =
//   "https://16f8-2409-408d-488-2a91-3db6-4867-9f37-d1cd.ngrok-free.app";
export const ACCESS_TOKEN = () => sessionStorage.getItem("token");

export function updateSessionInfo(value) {
  let prevData = JSON.parse(sessionStorage.getItem("userdata"));
  Object.keys(value).forEach(function (val, key) {
    prevData[val] = value[val];
  });
  sessionStorage.setItem("userdata", JSON.stringify(prevData));
  // window.location.reload()
}
