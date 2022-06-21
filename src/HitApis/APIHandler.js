import axios from 'axios';

const HitApi = async (url, apiMethod, params, token) => {
  var options =
    params != ''
      ? {
          url,
          method: apiMethod,
          headers: {
            Accept: 'application/json',
            'Content-Type': params == '' ? null : 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: JSON.stringify(params),
        }
      : {
          url,
          method: apiMethod,
          headers: {
            Accept: 'application/json',
            'Content-Type': params == '' ? null : 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
  try {
    try {
      const response = await axios(options);
      //console.log('Response:    ', JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      if (e.response && e.response.data) {
        return e.response.data;
      }
      console.log('Error is =====> ', JSON.stringify(e));
    }
  } catch (e) {
    console.log('Error is: ', e);
  }
};

export default HitApi;
