import Notification from "../models/Notification.js";

export const emitNotification = async ({io, to, from, type, message, data}) => {
    const notifiction = await Notification.create({
        to, 
        from,
        type,
        message,
        data,
    });

    io.to(to.toString().emit("newNotification", notifiction));
}