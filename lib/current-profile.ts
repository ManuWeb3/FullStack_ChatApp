import { auth } from '@clerk/nextjs' // to get currently active user (CAU)
import { db } from '@/lib/db' // univ./global prisma_client for comm. with database

export const currentProfile = async () => {
  const { userId } = auth()

  if (!userId) {
    return null // CAU is NOT authenticated
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: userId, // can only write "userId" - ES6
    },
  })

  return profile
}
