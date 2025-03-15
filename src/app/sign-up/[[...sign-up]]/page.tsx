import { SignUp } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
    const user = await currentUser()

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <SignUp fallbackRedirectUrl={`/${user?.username}`} />
        </div>
    )
}