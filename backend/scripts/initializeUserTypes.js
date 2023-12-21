const { create } = require("../models/response.model");
const UserType = require("../models/userType.model");

const initializeUserTypes = async() =>{
    try{
        const adminType = await UserType.findOne({type: "admin"});
        const userType = await UserType.findOne({type: "user"});

        if (!adminType)
            await UserType.create({type: "admin"});
        if (!userType)
            await UserType.create({type: "user"});
    }catch (error){
        console.error("Error initializing user types", error);
    }
};

module.exports = initializeUserTypes;