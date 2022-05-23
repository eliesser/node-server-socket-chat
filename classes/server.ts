import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import { Server as socketIO } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new socketIO(this.httpServer);

    this.watchSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private watchSockets() {
    console.log('Escuchando conexiones - sockets');

    this.io.on('connection', (client) => {
      // conect client
      socket.connectClient(client);

      socket.configUser(client, this.io);

      console.log(client.id);

      socket.disconnect(client);

      socket.message(client, this.io);
    });
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
