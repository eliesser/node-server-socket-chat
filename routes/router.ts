import { Router, Request, Response } from 'express';

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

  res.json({
    ok: true,
    body,
    from,
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const body = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  res.json({
    ok: true,
    body,
    de,
    id,
  });
});

export default router;
