import mongoose, {Schema, Document, Types} from "mongoose";
import UserModel, {IUser} from "./UserModel";
import {IMessage} from "./MessageModel";

export interface IConversation extends Document {
	participants: Types.DocumentArray<IUser>
    messages: Types.DocumentArray<IMessage>
    title: string
    lastUpdate: Date
    seen? : {
        userId: number
        messageId: number
    }
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>({
	participants: {
        type: [Schema<IUser>],
        required: true
    },
    messages: {
        type: [Schema<IMessage>],
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
            userId: {type: Number},
            messageId: {type: Number}
        })
    }
});

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;