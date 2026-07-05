import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port 

async function main() {
    try {
        await prisma.$connect()
        console.log("database connected");
        app.listen(port,()=>{
            console.log(`Server is Running port: 5000`);
        })
        
    } catch (error) {
        console.log("Error Starting Server", error);
        await prisma.$disconnect()
        process.exit(1)
        
    }
}

main();