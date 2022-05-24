import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { userConneted } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien!!!',
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;

  const server = Server.instance;

  server.io.emit('new-message', { from, body });

  res.json({
    ok: true,
    body,
    from,
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const body = req.body.body;
  const from = req.body.from;
  const id = req.params.id;

  const server = Server.instance;

  server.io.in(id).emit('mesage-private', { from, body });

  res.json({
    body,
    from,
    id,
    ok: true,
  });
});

router.get('/users', async (req: Request, res: Response) => {
  const server = Server.instance;

  const clients: string[] = [];

  for (let socket in server.io.engine.clients) {
    clients.push(server.io.engine.clients[socket].id);
  }

  res.json({
    ok: true,
    clients,
  });
});

router.get('/users/detail', async (req: Request, res: Response) => {
  const server = Server.instance;

  console.log(userConneted.getAllUser());

  res.json({
    ok: true,
    clients: userConneted.getAllUser(),
  });
});

export default router;
