import mongoose from "mongoose"

export const connectDB= async (params) => { try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected sucessfuly")
} catch (error) {
    console.log("Error connecting to MONGODB ", error);
    process.exit(1)//gagal
}
};