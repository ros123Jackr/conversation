let { http, passthrough } = require("msw");
let { setupServer } = require("msw/node");

// put one-off handlers that don't really need an entire file to themselves here
let miscHandlers = [
  http.post(`${process.env.REMIX_DEV_HTTP_ORIGIN}/ping`, () => passthrough()),
];

let server = setupServer(...miscHandlers);

server.listen({ onUnhandledRequest: "bypass" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
