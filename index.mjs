import * as dotenv from "dotenv";
import { app } from "./src/app.mjs";
import connectDB from "./src/Database/DbConfig.mjs";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Apollo server running at port ${process.env.PORT} 😎`);
    });
  })
  .catch(() => {
    console.error("connection failed");
  });

// MONGODB_URI=mongodb+srv://CRUD:hamzaali565@cluster0.kh990zg.mongodb.net/HospitalManagement?retryWrites=true&w=majority
// PORT=3001
