import {IMessage, MessageModel} from "../database/Mongo/Models/MessageModel";
import {IUser} from "../database/Mongo/Models/UserModel";
import {IReaction, ReactionModel} from "../database/Mongo/Models/ReactionModel";

async function createMessage(
    _conversationId : number,
    _from: IUser,
    _content: string,
    _postedAt: Date,
    _repliesTo: IMessage | null,
    _isEdited: boolean,
    _isDeleted: boolean,
    _reactions: IReaction[])
{
    let message = new MessageModel({
        conversationId: _conversationId,
        from: _from,
        content: _content,
        postedAt: _postedAt,
        repliesTo: _repliesTo,
        isEdited: _isEdited,
        isDeleted: _isDeleted,
        reactions: _reactions
    })
    await message.save();
}

async function getMessageById(id : number)
{
    return MessageModel.findById(id);
}

async function editMessage(id : number, newContent : string)
{
    let message = await MessageModel.findByIdAndUpdate(id,{ content: newContent });
    if (message){
        message.isEdited = true;
    }
}

function deleteMessage(id : number)
{
    MessageModel.findByIdAndUpdate(id,{ isDeleted: true });
}

async function reactToMessage(messageId : number, reactionId : number)
{
    let message = await MessageModel.findById(messageId);
    if (message){
        let reaction = await ReactionModel.findById(reactionId);
        if (reaction){
            message.reactions.push(reaction);
        }
    }
}

export {
    createMessage,
    getMessageById,
    editMessage,
    deleteMessage,
    reactToMessage
}