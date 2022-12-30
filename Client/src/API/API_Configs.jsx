import axios from "axios";
import { ACCESS_TOKEN, base_url } from "./Config";

axios.defaults.baseURL = base_url;

axios.defaults.headers.common = { 
	Accept: "application/json",
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

const authHeader = (token) => ({
	...(token && { Authorization: `Bearer ${token}` }),
});

export const Resourse_Url ={
	getAdminData: () =>	`/allusers`,
}

export const api_auth = {
    getApiwithAuth: async (url, accessToken) => {
		console.log("url.....",url);
		const headers = authHeader(accessToken);
		return await axios.get(url, {
			headers: headers,
		});
}
}