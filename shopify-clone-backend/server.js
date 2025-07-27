import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("disconnected", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})