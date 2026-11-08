/**
 * Metorial (Function Bay) entrypoint.
 *
 * Function Bay bundles the configured entrypoint and exposes its default (or
 * `handler`) export as a serverless function: the launcher calls it with
 * `event.payload` and returns the result. Metorial's gateway speaks the
 * `metorial-mcp.*` message protocol, whose server side is `serverAdapter`
 * from `@metorial/mcp-server`.
 *
 * The tool registry itself lives in index.ts and is shared with the local
 * stdio entrypoint, so both transports expose exactly the same tools/prompts.
 */
import {
  createMcpServer,
  serverAdapter,
  type McpServerInstanceMessage,
} from "@metorial/mcp-server";
import { server } from "./index.js";

const instance = createMcpServer({ server });

export const handler = (
  payload: McpServerInstanceMessage | McpServerInstanceMessage[],
) => serverAdapter(instance, Array.isArray(payload) ? payload : [payload]);

export default handler;
