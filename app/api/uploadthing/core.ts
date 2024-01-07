import { auth } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const handleAuth = () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Unauthorized User')
  }
  return { userId: userId }
}

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
// 2 types of uploads: ServerImage and MessageFile = endpoints
export const ourFileRouter = {
  serverImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(['image', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
