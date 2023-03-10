import express from 'express';
import Router from 'express-promise-router';
import { RouterOptions } from '../service/router';

export async function exampleRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();

  router.get('/ping', async (_, response) => {
    logger.info('Pong');
    response.json(['pong']);
  });
  
  return router;
}