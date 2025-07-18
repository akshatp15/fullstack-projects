import mongoose, { mongo } from "mongoose"

// Function that handles connection with MongoDB database
export const connectDB = async () => {
    try {
        // Attempt to connect db using .env MONGO_URI variable
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully")

    } catch(error){
        // Error Handling
        console.log("Error connecting to MongoDB", error)
        process.exit(1) //exit with failure
    }
}