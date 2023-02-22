import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  logger: Logger;
}

export interface PluginOptions {
  path: string;
  router: any;
}

export async function createRouter(
  options: RouterOptions,
  routers: Array<PluginOptions>,
): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  for (const subRouter of routers) {
    router.use(subRouter.path, await subRouter.router(options));
  }
  
  router.use(errorHandler());
  return router;
}
