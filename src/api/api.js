import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const HTTP = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 400000,
});

export default {
  getCaptors(params) {
    return HTTP.get('/captors', { params: { ...params } })
      .then((data) => data.data);
  },
  getAirports() {
    return HTTP.get('/airports')
      .then((data) => data.data);
  },
};
