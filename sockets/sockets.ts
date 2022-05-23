import { Socket } from 'socket.io';
import { Server as socketIO } from 'socket.io';
import { User } from '../classes/user';

import { UserList } from '../classes/user-list';

export const userConneted = new UserList();

export const connectClient = (client: Socket) => {
  const user = new User(client.id);

  userConneted.add(user);
};

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    userConneted.deleteUser(client.id);
    console.log('Cliente desconectado');
  });
};

export const message = (client: Socket, io: socketIO) => {
  client.on('message', (payload: { from: string; body: string }) => {
    console.log('Mensaje recibido', payload);

    io.emit('new-message', payload);
  });
};

export const configUser = (client: Socket, io: socketIO) => {
  client.on(
    'config-user',
    (payload: { name: string }, callback: (resp: any) => void) => {
      console.log('config user', payload);

      userConneted.updateName(client.id, payload.name);

      callback({
        ok: true,
        message: `User ${payload.name}, configured`,
      });
    }
  );
};
