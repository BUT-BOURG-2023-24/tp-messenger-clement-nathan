import mongoose, {Schema, Document, Types} from "mongoose";
import UserModel, {IUser} from "./UserModel";
import {IMessage} from "./MessageModel";

export interface IConversation extends Document {
	participants: IUser[]
    messages: IMessage[]
    title: string
    lastUpdate: Date
    seen? : {
        userId: IUser
        messageId: IMessage
    }[]
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>({
	participants: {
        type: [Schema.ObjectId],
        ref: "IUser",
        required: true
    },
    messages: {
        type: [Schema.ObjectId],
        ref: "IMessage",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lastUpdate: {
        type: Date,
        required: true
    },
    seen: {
        type: new Schema({
            userId: {
                type: Schema.ObjectId,
                ref: "IUser"
            },
            messageId: {
                type: Schema.ObjectId,
                ref: "IMessage"
            }
        })
    }
});

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export { ConversationModel };