import { IncomingMessage } from "http";

async function parsedBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert buffer to string
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error: any) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

export default parsedBody;
