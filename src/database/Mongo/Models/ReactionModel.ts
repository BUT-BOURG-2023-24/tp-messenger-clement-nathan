import mongoose, {Schema, Document} from "mongoose";
import {MongooseID} from "../../../types";
import UserModel, {IUser} from "./UserModel";

enum Reaction {
    HAPPY,
    SAD,
    THUMBSUP,
    THUMBSDOWN,
    LOVE
}
export interface IReaction extends Document {
    user : IUser
    reaction : Reaction
}

const ReactionSchema: Schema<IReaction> = new Schema<IReaction>({
    user: {
        type: Schema<IUser>,
        required: true
    },
    reaction: {
        type: Number,
        required: true
    }
});

const ReactionModel = mongoose.model<IReaction>("Reaction", ReactionSchema);

export {ReactionModel, ReactionSchema};