import { Server } from "socket.io";
import Chat from "../models/Chat.js";

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });

    global.io = io;

    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("joinRoom", (data) => {
            const { role, userId } = data;

            if (role === "admin") {
                socket.json("admin");
                console.log(`Admin joined room: admin`);
            } else {
                socket.json(userId);
                console.log(`User ${userId} joined room`);
            }
        });

        socket.on("sendMessage", async ({ sender, receiver, message, orderId }) => {
            try {
                const chat = await Chat.create({ sender, receiver, message, orderId });
                io.to(receiver).emit("receiverMessage", chat);
            } catch (error) {
                console.error("Error sending message", err.message);
            }
        });
    });

    return io;
};

export const getIo = () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
}