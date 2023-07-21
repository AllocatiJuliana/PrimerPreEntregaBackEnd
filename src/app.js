import express from "express";
import handlebars from "express-handlebars";
import { Server as SocketServer } from "socket.io";
import __dirname from "./config/dirname.js";

// import { productsRouter } from "./routes/products.routes.js";
// import { cartRouter } from "./routes/carts.routes.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// app.use(express.json());
// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
  res.render("index");
});

const appServer = app.listen(8080, () => {
  console.log("server runnung 8080");
});

const socketServer = new SocketServer(appServer);

socketServer.on("connection", (socket) => {
  console.log(socket);
});
