import { Request } from "express";

/**
 * Define the attributes to be contained in the global context.
 */
export interface RequestQueryParams {
  noJS?: boolean;
}

/**
 * We agument the global context for getting the right
 * types inside components.
 */
declare module "lean-jsx/src/types/context" {
  interface SXLGlobalContext extends RequestQueryParams {}
}

/**
 * Parse request parameters to be used in the global context.
 * @param req
 * @returns
 */
export function parseQueryParams(req: Request): RequestQueryParams {
  return {
    noJS: Boolean(req.query.noJS),
  };
}
