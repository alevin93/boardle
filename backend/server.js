const express = require('express');
const corsOptions = require('./corsOptions');
const bodyParser = require('body-parser')
const port = 4000;
const cors = require('cors');


const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.post('/submit', (req, res) => {
  console.log('HIT BACKEND --> print: ' + req.body.data);
  res.send({"Data": "Data"});
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})