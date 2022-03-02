import { config } from './configs';
import { connectDb } from './lib';
import { app } from './api/app';
import http from 'http';
// const http: typeof h = config.PROD ? require('https') : require('http');

const server = http.createServer(app);
server.listen(config.PORT, () => {
  connectDb();

  if (!config.PROD) {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  }
});
