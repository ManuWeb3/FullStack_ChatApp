import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()
// reuse the existing one OR, if it's not available, instantiate a new Prisma CLient

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}
// this returned "db" will have PrismaClient object
// This "PrismaClient" obj will have properties that are models in schema.prisma
// db.profile/server/channel/member - works
