import axios from 'axios';

const HitApi = (url, apiMethod, params, token) => {
  var options = {
    url,
    method: apiMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: params ? params : '',
  };
  try {
    return axios(options)
      .then(response => {
        console.log('API respones', response.data);
        return response.data;
      })

      .catch(e => {
        console.log('Error is=====: ', e.response.data);
        return e.response.data;
      });
  } catch (e) {
    console.log('Error is: ', e);
  }
};

export default HitApi;
