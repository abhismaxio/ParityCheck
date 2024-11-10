import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { env } from '@/data/env/server'
import { db } from '@/drizzle/db'
import { UserSubscriptionTable } from '@/drizzle/schema'
import { deleteUser } from '../../../../../server/db/users'

export async function POST(req: Request) {


  // Get the headers
  const headerPayload = headers()
  const svixId = (await headerPayload).get('svix-id')
  const svixTimestamp = (await headerPayload).get('svix-timestamp')
  const svixSignature = (await headerPayload).get('svix-signature')

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  
  const eventType = evt.type
  switch (eventType) {
    
    case "user.created":{
        console.log("HY")
        await db.insert(UserSubscriptionTable).values({clerkUserId:evt.data.id, tier:"Free"})
        break
    }
    case "user.deleted":{
        if (evt.data.id != null){
            console.log("delted")
            await deleteUser(evt.data.id)
        }
    }
  }
   

  return new Response('', { status: 200 })
}