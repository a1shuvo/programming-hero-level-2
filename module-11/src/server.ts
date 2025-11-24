import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";

addRoutes("GET", "/", (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello from node.js with typescript",
      path: req.url,
    })
  );
});

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found!",
          path,
        })
      );
    }

    // root route
    // if (req.url == "/" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello from node.js with typescript",
    //       path: req.url,
    //     })
    //   );
    // }

    // health route
    // if (req.url == "/api" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Health status is ok",
    //       path: req.url,
    //     })
    //   );
    // }

    // user post route
    // if (req.url == "/api/users" && req.method == "POST") {
    //   // const user = {
    //   //   id: 123,
    //   //   name: "Shuvo",
    //   // };
    //   // res.writeHead(200, { "content-type": "application/json" });
    //   // res.end(JSON.stringify(user));

    //   let body = "";

    //   // listen for data chunk
    //   req.on("data", (chunk) => {
    //     body += chunk.toString();
    //   });

    //   req.on("end", () => {
    //     try {
    //       const parsedBody = JSON.parse(body);
    //       console.log(parsedBody);
    //       console.log("Catching current changes");
    //       res.end(JSON.stringify(parsedBody));
    //     } catch (error: any) {
    //       console.log(error?.message);
    //     }
    //   });
    // }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port: ${config.port}`);
});
