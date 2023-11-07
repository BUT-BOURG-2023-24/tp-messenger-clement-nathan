const UserModel = require('../database/Mongo/Models/UserModel');

async function createUser(username: string, password: string, profilePicId?: number)
{
    const user = new UserModel({
        username: username,
        password: password,
        profilePicId: profilePicId
    });
    try
    {
        await user.save();
    }
    catch (error)
    {
        return error;
    }
}

async function getUserByName(name: string)
{
    try {
        const user = await UserModel.find(name);
        return user;
    }
    catch (error)
    {
        return error;
    }
}

async function getUserById(id: number)
{
    try {
        const user = await UserModel.find(id);
        return user;
    }
    catch (error)
    {
        return error;
    }
}

async function getUsersByIds()
{
    try {
        let users:any = [];
        for (const id in arguments) {
            users.push(UserModel.find(id));
        }
        return users;
    }
    catch (error)
    {
        return error;
    }
}

module.exports = {
    createUser,
    getUserByName,
    getUserById,
    getUsersByIds
}