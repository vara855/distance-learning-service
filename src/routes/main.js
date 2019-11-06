import { Router } from 'express';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { models } from '../models';

const router = Router();
const { User } = models;

router.get('/users', async (req, res) => {
  try {
    const all = await User.find({});
    return res.status(OK).send(all);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }
});

export default router;
