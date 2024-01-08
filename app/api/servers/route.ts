// we did axios.post() on this URL = /api/servers
// now we need to process that data: name, imageUrl - coming from the user/client
// first, you got to receive the request before processing it
import { currentProfile } from '@/lib/current-profile'
import { NextRequest, NextResponse } from 'next/server'

import { v4 as uuidv4 } from 'uuid' // readable that v4 pertains to uuidv4 only

export async function POST(request: NextRequest) {
  try {
    // 2-step auth.
    // Step # 1 - already done by zod on client-side for name and imageUrl
    const { name, imageUrl } = await request.json() // JSON to JS (Promise) + destructure in the same step

    // Step # 2 - CAU is NOT authenticated
    const profile = await currentProfile() // ALSO, get the currentProfile = async (Promise) ALONGWITH form data
    if (!profile) {
      return NextResponse.json(
        { error: 'Authentication Failed!' },
        { status: 400 }
      )
    }

    // 2 steps done: finally, create a Server (= ChatGroup) with name and imageUrl form data
  } catch (error) {
    console.log(`SERVERS_POST: ${error}`)
    return NextResponse.json(
      { errors: 'Internal Server Error' },
      { status: 500 }
    )
    // bcz if there happened an error insdie the try{}, that means we should have wwritten better code
    // error at our end = backend, NOT frontend.
    // that's why we're inside catch(){}
    // that's why we have `SERVERS_POST: ${error}` to debug at our end
  }
}
