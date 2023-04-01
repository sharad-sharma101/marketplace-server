import express from "express";
import { addCar, getAllCars, getByID, getByUserId, removeByID, updateCar } from "../controllers/car-controler";

const carsRouter = express.Router();

carsRouter.get("/",getAllCars);
carsRouter.post("/add", addCar);
carsRouter.put("/update/:id", updateCar);
carsRouter.get("/:id", getByID);
carsRouter.delete("/:id", removeByID )
carsRouter.get("/user/:id", getByUserId);

export default carsRouter; 

