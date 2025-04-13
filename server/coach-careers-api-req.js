const request = require('request');

const options = {
  method: 'POST',
  url: 'https://auth.emsicloud.com/connect/token',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  form: {
    client_id: '<CLIENT_ID>',
    client_secret: '<CLIENT_SECRET>',
    grant_type: 'client_credentials',
    scope: 'careers'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
