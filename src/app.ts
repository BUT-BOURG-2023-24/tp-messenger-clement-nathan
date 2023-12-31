import * as http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { Database } from "./database/database";
import { SocketController } from "./socket/socketController";

const app = express();

function makeApp(database: Database) 
{
	app.locals.database = database;

	const server = http.createServer(app);
	app.use(express.json());

	const io = new Server(server, { cors: { origin: "*" } });
	let socketController = new SocketController(io, database);

	app.locals.sockerController = socketController;

	return { app, server };
}

app.use(cors({

credentials: true,

origin: "http://localhost:3000"

}));

export { makeApp };
