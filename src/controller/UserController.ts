import UserModel from '../database/Mongo/Models/UserModel';

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

async function getUserByName(_name: string)
{
    try {
        return await UserModel.find({name: _name});
    }
    catch (error)
    {
        return error;
    }
}

async function getUserById(id: number)
{
    try {
        return await UserModel.findById(id);
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
            users.push(UserModel.findById(id));
        }
        return users;
    }
    catch (error)
    {
        return error;
    }
}

export {
    createUser,
    getUserByName,
    getUserById,
    getUsersByIds
}