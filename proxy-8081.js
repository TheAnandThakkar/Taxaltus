const http = require("http");
const net = require("net");

const TARGET = { host: "127.0.0.1", port: 5000 };

const server = http.createServer((req, res) => {
  const proxyReq = http.request(
    { ...TARGET, path: req.url, method: req.method, headers: req.headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );
  proxyReq.on("error", () => { res.writeHead(502); res.end(); });
  req.pipe(proxyReq);
});

server.on("upgrade", (req, socket, head) => {
  const proxySocket = net.connect(TARGET.port, TARGET.host, () => {
    proxySocket.write(
      `${req.method} ${req.url} HTTP/1.1\r\n` +
      Object.entries(req.headers).map(([k, v]) => `${k}: ${v}`).join("\r\n") +
      "\r\n\r\n"
    );
    if (head.length) proxySocket.write(head);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });
  proxySocket.on("error", () => socket.end());
  socket.on("error", () => proxySocket.end());
});

server.listen(8081, "0.0.0.0", () => {
  console.log("Proxy: 8081 -> 5000");
});
