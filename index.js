const axios = require('axios');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const checkWebsite = async () => {
  try {
    const response = await axios.get('https://upserver.undefinedpengui.repl.co');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

app.get('/', (req, res) => {
  checkWebsite()
    .then((isUp) => {
      res.send(`Website is ${isUp ? 'up' : 'down'}`);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

setInterval(() => {
  checkWebsite()
    .then((isUp) => {
      console.log(`Website is ${isUp ? 'up' : 'down'}`);
    })
    .catch((error) => {
      console.log(error);
    });
}, 5 * 60 * 1000); // 5 minutes in milliseconds
