import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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

export default router;
