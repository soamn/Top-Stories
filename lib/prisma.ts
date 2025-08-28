import { PrismaClient } from "@/app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalPrisma = global as unknown as {
  prisma: PrismaClient;
};
const prisma =
  globalPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;

export default prisma;
