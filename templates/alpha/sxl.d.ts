/// <reference types="lean-jsx-types/global" />
/// <reference lib="dom" />

/**
 * Add TypeScript support for custom imported types.
 */
declare module "*.svg" {
  const content: string;
  export default content;
}
