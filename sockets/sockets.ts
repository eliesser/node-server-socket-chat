import { Socket } from 'socket.io';
import { Server as socketIO } from 'socket.io';

export const disconnect = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
};

export const message = (cliente: Socket, io: socketIO) => {
  cliente.on('message', (payload: { from: string; body: string }) => {
    console.log('Mensaje recibido', payload);

    io.emit('new-message', payload);
  });
};
