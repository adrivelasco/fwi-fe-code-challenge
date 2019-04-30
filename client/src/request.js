const apiUrl = 'http://localhost:3001';

/**
 * Fetch with default options
 * @param {string} url
 * @param {Object} options
 */
function request(url, options = {}) {
  try {
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    if (options.queryParams) {
      url +=
        (url.indexOf('?') === -1 ? '?' : '&') +
        queryParams(options.queryParams);
      delete options.queryParams;
    }

    return fetch(`${apiUrl}${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    }).then(response => response.json());
  } catch (err) {
    return err;
  }
}

function queryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export default request;
