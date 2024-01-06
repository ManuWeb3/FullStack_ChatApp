import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'

export const initialProfile = async () => {
  // all 3 events have an interaxtion with the DB => await => async function initialProfile() in ES6 format ("function ref. variable" notation used)
  const user = await currentUser()
  // The currentUser helper returns the User object of the currently active user
  // currentUser(), <SignIn />, <SignUp />, <UserButton />, Account_Management interface/form -- all UTH taken care of by Clerk
  // The User object holds all of the information for a single user of your application
  // and provides a set of properties and methods to manage their account
  // user.id exists - e.g.

  if (!user) {
    return redirectToSignIn() // event # 1 for a new user
  }

  // load/get/return/extract the profile of the user that is currentUser/logged in
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (profile) {
    return profile // event # 3 for a new user
  }
  // if no such profile exists => user signed in for the first time => need to create its profile
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`, // all the LHS props match our Profile model and RHS values match when user first created its profile using Clerk-SignUp/In
      imageUrl: `user.imageUrl`,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newProfile // event # 2 for a new user
}
