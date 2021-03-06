import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = http.createServer(this.app);
    this.io = new socketIO.Server(this.httpServer);

    this.watchSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private watchSockets() {
    console.log('Escuchando conexiones - sockets');

    this.io.on('connection', (client) => {

      socket.connectClient(client, this.io);

      socket.configUser(client, this.io);

      socket.disconnect(client, this.io);

      socket.message(client, this.io);

      socket.getUsers(client, this.io);
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
