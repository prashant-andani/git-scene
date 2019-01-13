import axios from 'axios';

const _ajax = ({ method, url, data = {} }) =>
  axios({ method, url, data })
    .then(response => response)
    .catch(error => error.response);

const postData = (url, data) => _ajax({ method: 'post', url, data });

const getData = (url, data) => _ajax({ method: 'get', url, data });

const putData = (url, data) => _ajax({ method: 'put', url, data });

const deleteData = url => _ajax({ method: 'delete', url });

const patchData = (url, data) => _ajax({ method: 'patch', url, data });

function handleAPIError(error) {
  if (error.response.status === 403) {
  } else {
    return Promise.reject(error);
  }
  return false;
}
axios.interceptors.response.use(response => response, handleAPIError);
export { getData, postData, putData, deleteData, patchData };
