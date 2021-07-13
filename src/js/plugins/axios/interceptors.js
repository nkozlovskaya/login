const lsTokenKey = 'my_app_token';

function setToken(req) {
  console.log(req);

  return req;
}

function setTokenOnLogin(req) {
  const isAuthUrl = req.url.includes('auth');

  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    req.headers['x-access-token'] = token;
  }

  return req;
}

function getClearResponse(res) {
  return res.data;
}

function onError(err) {
  console.log(err);
  return Promise.reject(err);
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse, onError);
}