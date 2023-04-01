import mongoose from 'mongoose';
import Car from '../model/Car';
import User from '../model/User';

export const getAllCars = async (req, res, next) =>{
    let cars;
    try{
        cars = await Car.find();
    } catch (err) {
        return console.log(err);
    }
    if(!cars){
        return res.status(404).json({message: "no car found"});
    }
    return res.status(200).json({cars});
}

export const addCar = async (req, res, next) => {
    const {title, kms, scratchs, paint, accident, place, image, user} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "Cauldn't find this user"});
    }

    const car = new Car({
        title, 
        kms, 
        scratchs, 
        paint, 
        accident, 
        place, 
        image, 
        user  
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await car.save({session});
        existingUser.cars.push(car);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch(err) {
       console.log(err);
       return res.status(500).json({message: err});
    }
    return res.status(200).json({car});
}

export const updateCar = async (req, res, next) => {
    const {title, kms, scratchs, paint, accident, place, image, user} = req.body;
    const carID = req.params.id;
    let car;
    try{
    car = await Car.findByIdAndUpdate( carID, {
        title, 
        kms, 
        scratchs, 
        paint, 
        accident, 
        place, 
        image
    });
    } catch(err) {
       return console.log(err);
    }
    if(!car){
        return res.status(500).json({message: "unable to update tis detail"});
    }
    return res.status(200).json({car});
}

export const getByID = async (req, res, next) => {
    const carID = req.params.id;
    let car;
    try{
       car = await Car.findById(carID);
    } catch(err) {
       return console.log(err);
    }
    if(!car){
        return  res.status(404).json({message : "unable to find this car"})
    }
    return res.status(200).json({car});
}

export const removeByID = async (req, res, next) => {
    const carID = req.params.id;

    let car;
    try{
       car = await Car.findByIdAndRemove(carID).populate("user");
       await car.user.cars.pull(car);
       await car.user.save();
    } catch(err) {
       return console.log(err);
    }
    if(!car){
        return  res.status(500).json({message : "unable to delete this car"})
    }
    return res.status(200).json({message: "delete this car"});
}

export const getByUserId = async (req, res, next) =>{
    const userId = req.params.id;
    let userCars;
    try{
        userCars = await User.findById(userId).populate("cars");
    } catch (err) {
        return console.log(err);
    }
    if(!userCars){
        return res.status(404).json({message: "No car found"});
    }
    return res.status(200).json({cars: userCars})
}