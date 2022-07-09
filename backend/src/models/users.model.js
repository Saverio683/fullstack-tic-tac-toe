const users = require('./users.mongo');

const createNewUser = async (username, email, password) => {
    const checkUsername = await users.find({ username }) //check if the username already exists in the db    
    //if there is no user with the passed parameter, the find method will return an empty array
    if(checkUsername.length > 0) 
        return {
            error: 'Username already taken'
        }   
         
    const checkEmail = await users.find({ email }) //same for the email
    if(checkEmail.length > 0) 
        return {
            error: 'There is already an account registered with this email'
        }

    const user = await users.create({
        username,
        email,
        password,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        draws: 0,
    })
    return user
}
 
const getUser = async (email, password) => {
    const user = await users.find({
        email,
        password
    })

    if(user.length === 0)
        return {
            error: 'Wrong email or password'
        }

    return user
}

const updateUserStats = async (outcome, username) => {
    let stat = ''
    switch (outcome) {
        case 'victory':
            stat = 'gamesWon'
            break
        case 'defeat':
            stat = 'gamesLost'
            break
        case 'draw':
            stat = 'draws'
            break
        default:
            break
    }
    await users.updateOne(
        { username },
        {
            $inc: { [stat]: 1, 'gamesPlayed': 1 }
        }
    )

    const user = await users.find({
        username
    })    

    return user
}

module.exports = {
    createNewUser,
    getUser,
    updateUserStats
}