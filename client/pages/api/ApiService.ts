const BASE_URL: string = 'http://localhost:3001';

async function fetchRequest(path: string, options?: object) {
  try {
    const res = await fetch(BASE_URL + path, options);
    const res_1 = res.status < 400 ? res : Promise.reject();
    return res_1.status !== 204 ? res_1.json() : res_1;
  } catch (err) {
    console.error('Error: ', err);
  }
}

function getAll() {
  return fetchRequest('/note');
}

function postNote(body: FormData) {
  return fetchRequest('/note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function putNote(body: object, id: string) {
  return fetchRequest(`/note/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

const ApiService = { postNote, getAll, putNote };

export default ApiService;
