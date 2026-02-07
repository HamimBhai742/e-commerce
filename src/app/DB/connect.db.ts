import { prisma } from "../lib/prisma"

export const connectedDb=async()=>{
try {
    await prisma.$connect().then(() => console.log('Database connected successfully')).catch((error) => console.log('Database connection failed', error));
} catch (error) {
    console.log(error)
}
}