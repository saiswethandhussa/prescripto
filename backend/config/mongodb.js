// import mongoose from "mongoose"


// const connectDB=async()=>{
//     mongoose.connection.on('connected',()=>console.log("Database Connected"))
//   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }

// export default connectDB
import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(process.env.MONGO_URI)
}

export default connectDB
//import mongoose from "mongoose"

// const connectDB = async () => {
//   try {
//     console.log("MONGO_URI =", process.env.MONGO_URI)
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log("Database Connected")
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message)
//   }
// }

//  export default connectDB
// import mongoose from "mongoose"

// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGO_URI)
//   console.log("Database Connected")
// }

// export default connectDB
// import mongoose from "mongoose"

// const connectDB = async () => {
//   try {
//     console.log("MONGO_URI FROM ENV =>", process.env.MONGO_URI)
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log("Database Connected")
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message)
//     process.exit(1)   // stop server if DB fails
//   }
// }

// export default connectDB


