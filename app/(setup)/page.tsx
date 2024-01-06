import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { InitialModal } from '@/components/modals/initial-modal'

const SetUpPage = async () => {
  // either profile below will be an existing one or a newly created one but cannot be null
  // bcz if there were no profile in the 1st polace, then initialProfile.ts wiould have redirected user to SignIn
  const profile = await initialProfile() // this is the reason why we have this comp. as async
  // check what servers this profile is a part of

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect('/servers/${server.id}') // maybe it ends up being an input to dynamic route - [serverId]
  }
  // if no server, then "create a server" msg to user
  return <InitialModal />
}

export default SetUpPage
