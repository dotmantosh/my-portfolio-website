import axios from "axios";
import store from "../store/store";
const url = `api/`;
export default () => {
	return axios.create({
		baseURL: url, // for development http://localhost:3000/
		headers: {
			Authorization: `Bearer ${store.state.token}`,
		},
	});
};
