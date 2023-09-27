import "dotenv/config";

import cors from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const port = process.env.PORT;
const proxyTarget = process.env.PROXY_TARGET;

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, !!origin);
    },
    credentials: true,
  })
);

app.use(
  createProxyMiddleware({
    target: proxyTarget,
    changeOrigin: true,
    onProxyRes: (proxyResponse, request) => {
      if (request.header("origin"))
        proxyResponse.headers["access-control-allow-origin"] =
          request.header("origin");
    },
  })
);

app.listen(port, () =>
  console.log(`local proxy is running at http://0.0.0.0:${port}`)
);
