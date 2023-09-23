// Import the express module
import express from "express";
import { AppDataSource } from "./config/db/config";
import { authRoutes } from "./modules/auth/controller";
import { config } from 'dotenv';
import cors from 'cors'

config();
// Create an instance of the express app
const app = express(); app.use(express.json())
app.use(cors({ origin: '*' }))
// Define a route for the root URL

app.get('/health', async (req: any, res: { send: (arg0: string) => void; }) => {

  res.send(AppDataSource.isInitialized ? "connected" : "not connected");

});
app.use('/auth', authRoutes)


const PORT =  process.env.PORT || 3002 
// Start the server
app.listen(PORT, async () => {
  await AppDataSource.initialize()
  

  console.log(`Server is running on http://localhost:${PORT}`);

});
