import http from 'http';
import { startRequesting } from './app'
import app from './server';

const server = http.createServer(app);
let currentApp = app;

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

startRequesting();
