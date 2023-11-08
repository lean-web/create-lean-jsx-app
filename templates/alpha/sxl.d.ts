/// <reference types="lean-jsx/lib/global" />
/// <reference lib="dom" />

/**
 * Add TypeScript support for custom imported types.
 */
declare module "*.svg" {
  const content: string;
  export default content;
}
