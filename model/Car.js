import mongoose from "mongoose";

const Schema = mongoose.Schema;

const carSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    kms: {
        type:Number,
        required: true
    },
    scratchs: {
        type:Number,
        required: true
    },
    paint: {
        type:String,
        required: true
    },
    accident: {
        type:Number,
        required: true
    },
    place: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
});

export default mongoose.model("Car", carSchema); 