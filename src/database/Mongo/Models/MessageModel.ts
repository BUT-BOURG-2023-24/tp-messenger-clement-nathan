import mongoose, {Schema, Document} from "mongoose";
import {MongooseID} from "../../../types";
import {IUser} from "./UserModel";
import {IReaction} from "./ReactionModel";

export interface IMessage extends Document {
    conversationId: number
    from: IUser
    content: string
    postedAt: Date
    repliesTo: IMessage | null
    isEdited: boolean
    isDeleted: boolean
    reactions: IReaction[]
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
    conversationId: {
        type: Number,
        required: true
    },
    from: {
        type: Schema<IUser>,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        required: true
    },
    repliesTo: {
        type: Schema<IMessage>,
        required: false
    },
    isEdited: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    reactions: {
        type: [Schema<IReaction>],
        required: true
    }
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export {MessageModel, MessageSchema};
