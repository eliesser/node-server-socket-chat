import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { User } from '../classes/user';

import { UserList } from '../classes/user-list';

export const userConneted = new UserList();

export const connectClient = (client: Socket, io: socketIO.Server) => {
  const user = new User(client.id);

  userConneted.add(user);
};

export const disconnect = (client: Socket, io: socketIO.Server) => {
  client.on('disconnect', () => {
    userConneted.deleteUser(client.id);

    io.emit('active-users', userConneted.getAllUser());
  });
};

export const message = (client: Socket, io: socketIO.Server) => {
  client.on('message', (payload: { from: string; body: string }) => {
    io.emit('new-message', payload);
  });
};

export const configUser = (client: Socket, io: socketIO.Server) => {
  client.on(
    'config-user',
    (payload: { name: string }, callback: (resp: any) => void) => {
      userConneted.updateName(client.id, payload.name);

      io.emit('active-users', userConneted.getAllUser());

      callback({
        ok: true,
        message: `User ${payload.name}, configured`,
      });
    }
  );
};

export const getUsers = (client: Socket, io: socketIO.Server) => {
  client.on('get-users', () => {
    io.in(client.id).emit('active-users', userConneted.getAllUser());
  });
};
