import { config } from "./configs";
import { connectDb, runOnDevMode } from "./lib";
import { app } from "./api/app";
import http from "http";
import { Server } from "socket.io";
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from "./interfaces";

const server = http.createServer(app);

// socket.io
export const ioServer = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
        origin: "http://localhost:3000",
        // origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"],
        credentials: true,
    },
});

ioServer.on("connection", (socket) => {
    console.log("new connection", socket.id);
    socket.emit("withAck", "Welcome to Courier 007", (e: number) => {
        console.log(`Client age is: ${e}`);
    });
});

async function prepare() {
    await connectDb();
    runOnDevMode(() => {
        console.log(`Server is running on http://localhost:${config.PORT}`);
    });
}

server.listen(config.PORT, () => {
    prepare();
});

export { prepare, server };
