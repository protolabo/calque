import app from "./app"
import dotenv from 'dotenv';


export const startServer = ():void=>{
//port from env file
dotenv.config();
const port: string = (process.env.PORT || "3000");


// Start server (Communication between Client and Server)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

}