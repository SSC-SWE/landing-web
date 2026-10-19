import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { normalise, validate } from "./validation.js";

const PORT = Number(process.env.PORT ?? 8787);
const MAX_BODY_BYTES = 16 * 1024;

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function send(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  if (!req.headers["content-type"]?.includes("application/json")) {
    throw new HttpError(415, "Send the form as JSON.");
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > MAX_BODY_BYTES) throw new HttpError(413, "Request is too large.");
    chunks.push(chunk as Buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new HttpError(400, "Request body is not valid JSON.");
  }
}

async function handleApplication(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const application = normalise(await readJson(req));
  const errors = validate(application);

  if (Object.keys(errors).length > 0) {
    send(res, 422, { ok: false, errors });
    return;
  }

  // Validate-only: nothing is stored, mailed, or issued.
  send(res, 200, {
    ok: true,
    message: "Request checked. No key was created and no credit was added, so nothing was saved.",
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  try {
    if (url.pathname === "/api/health" && req.method === "GET") {
      send(res, 200, { ok: true });
      return;
    }
    if (url.pathname === "/api/applications") {
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        throw new HttpError(405, "Use POST.");
      }
      await handleApplication(req, res);
      return;
    }
    throw new HttpError(404, "Not found.");
  } catch (error) {
    if (error instanceof HttpError) {
      send(res, error.status, { ok: false, error: error.message });
    } else {
      console.error(error);
      send(res, 500, { ok: false, error: "Something went wrong." });
    }
  }
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
