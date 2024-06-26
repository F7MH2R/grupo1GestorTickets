import axios from "axios";
const url = "https://localhost:7289/api";

export async function ejecutarGet(sufijo) {
  const urlCompleta = generarEndpoint(sufijo);
  return axios.get(urlCompleta).catch((error) => console.error(error));
}

export async function ejecutarPatch(sufijo, datos) {
  const endpoint = generarEndpoint(sufijo);
  return axios.patch(endpoint, datos);
}

export async function ejecutarDelete(sufijo, datos) {
  const endpoint = generarEndpoint(sufijo);
  return axios.delete(endpoint, datos);
}

export async function ejecutarPost(sufijo, datos) {
  const endpoint = generarEndpoint(sufijo);
  console.log(endpoint);
  return axios.post(endpoint, datos);
}

const generarEndpoint = (sufijo) => url.concat(sufijo);
