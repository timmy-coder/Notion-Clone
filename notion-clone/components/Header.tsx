'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import BreadCrumbs from "./BreadCrumbs"

function Header() {
    const {user} = useUser()

  return (
    <div className="flex items-center justify-between p-5">
        {user&& (
            <h1 className="text-2xl">{user?.firstName} {"s"} Space</h1>
        )}

        {/* Breadcrumbs */}

        <BreadCrumbs/>
        
        <div>
            <SignedOut>
                <SignInButton/>
            </SignedOut>

            <SignedIn>
                <UserButton/>
            </SignedIn>
        </div>

    </div>
  )
}

export default Header