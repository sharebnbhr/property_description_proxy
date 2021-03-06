const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');


const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', proxy({ 
  target: 'http://localhost:3000', 
  router: {
    '/photos': 'http://localhost:3001',
    '/desc': 'http://localhost:3002',
    '/rating': 'http://localhost:3004',
    '/reservations': 'http://localhost:3003',
    '/reviews': 'http://localhost:3004',
  },
  changeOrigin: true 
}));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up on ${port}`));