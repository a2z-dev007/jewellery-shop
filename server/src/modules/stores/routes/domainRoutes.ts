import { Router, Request, Response } from 'express';
import { Store } from '../models/Store';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

// Endpoint for Caddyask verify-domain
router.get(
  '/verify-domain',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const domain = req.query.domain as string;

    if (!domain) {
      res.status(400).send('Domain query parameter required');
      return;
    }

    // Lookup store by customDomain or slug
    const store = await Store.findOne({
      $or: [{ customDomain: domain }, { slug: domain }],
    }).exec();

    if (!store) {
      res.status(404).send('Domain not mapped');
      return;
    }

    res.status(200).send('OK');
  })
);

export default router;
