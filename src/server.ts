import http from 'http';
import { config } from './configs';
import { connectDb } from './libs';
import { app } from './api/app';
import console from 'console';

const server = http.createServer(app);
server.listen(config.PORT, () => {
  connectDb();

  if (!config.PROD) {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  }
});
