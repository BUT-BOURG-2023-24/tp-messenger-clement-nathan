import {ConversationModel, IConversation}  from "../database/Mongo/Models/ConversationModel"
import { IMessage } from "../database/Mongo/Models/MessageModel";
import {UserModel, IUser} from "../database/Mongo/Models/UserModel";

async function getConversationWithParticipants()
{

}

async function getAllConversationsForUser(
    _userId : number
)
{
    let user = await UserModel.findById(_userId);
    return await ConversationModel.find({participants : {user}}).exec();
}

async function getConversationById(
    _conversationId : number
)
{
    return await ConversationModel.findById(_conversationId);
}

async function createConversation(
    _participants : IUser[]
)
{
    let title = "";
    let participantsNumber = _participants.length;
    for (let i = 0; i<participantsNumber; i++) {
        title += _participants[i].username;
        if(i!=participantsNumber-1) {
            title += ",";
        }
    }
    return await ConversationModel.create({participants: _participants, messages: {}, title: title, lastUpdate: Date()});
}

async function addMessageToConversation(
    _conversationId : number,
    _message : IMessage
)
{
    return await ConversationModel.findOneAndUpdate({id : _conversationId}, {messages : _message, lastUpdated : Date()});
}

async function setConversationSeenForUserAndMessage(
    _conversationId : number,
    _userId : number,
    _messageId : number
)
{
    return await ConversationModel.findOneAndUpdate({id : _conversationId}, {seen: {userId : _userId, messageId : _messageId}});
}

async function deleteConversation(
    _conversationId : number
)
{
    return await ConversationModel.deleteOne({id : _conversationId});
}

export {
    getConversationWithParticipants,
    getAllConversationsForUser,
    getConversationById,
    createConversation,
    addMessageToConversation,
    setConversationSeenForUserAndMessage,
    deleteConversation
}