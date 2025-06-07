import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/notes';
import type { Note } from '../types';

const getAll = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (error) {
		console.log(`Unable to fetch Notes ${error}`);
		throw error;
	}
};

const create = async (newObject: Note) => {
	try {
		const response = await axios.post(baseUrl, newObject);
		return response.data;
	} catch (error) {
		console.error(`Unable to create Note ${error}`);
		throw error;
	}
};

const update = async (id: string, newObject: Note) => {
	try {
		const response = await axios.put(`${baseUrl}/${id}`, newObject);
		return response.data;
	} catch (error) {
		console.error(`Unable to Update Note${error}`);
		throw error;
	}
};

export default {
	getAll,
	create,
	update,
};
