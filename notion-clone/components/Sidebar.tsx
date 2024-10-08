'use client'
import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import {useCollection} from 'react-firebase-hooks/firestore'
import { useUser } from "@clerk/nextjs"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import SiderbarOption from "./SiderbarOption"
  


interface RoomComponent extends DocumentData{
    createdAt: string;
    role: "owner" | "edito";
    roomId: string;
    userId: string
}
function Sidebar() {
    const {user} = useUser()
    const [groupedData, setGroupedData] = useState<{
        owner: RoomComponent[];
        editor: RoomComponent[]
    }>({
        owner: [],
        editor: []
    })
    const [data, loading, error] = useCollection(
        user && (
            query(collectionGroup(db, "rooms"), where("userId", "==", user?.emailAddresses[0].toString()))
        )
    );

    useEffect(() => {
        if(!data) return;
        const grouped = data.docs.reduce<{
            owner: RoomComponent[];
            editor: RoomComponent[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomComponent;

                if (roomData.role === 'owner'){
                    acc.owner.push({
                        id: curr.id,
                        ...roomData
                    })
                }
                else {
                    acc.editor.push({
                        id: curr.id,
                        ...roomData
                    })
                }
                return acc;
            }, {
                owner: [],
                editor: []
            }
        )

        setGroupedData(grouped)
    }, [data])
    const menuOptions = (
        <>
        <NewDocumentButton/>
        <div className="flex py-4 flex-col space-y-4 md:max-w-36">
             {/* My Documents */}
                {groupedData.owner.length === 0?(
                    <h2 className="text-gray-500 font-semibold text-sm">No doument found</h2>
                ):(
                    <>
                    <h2 className="text-gray-500 font-semibold text-sm">My document</h2>

                    {groupedData.owner.map((doc) => (
                       <SiderbarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
                    ))}
                    </>
                )}
       

        {/* Shared with me */}

        {groupedData.editor.length > 0 && (
            <>
            <h2 className="text-gray-500 font-semibold text-sm">Shared with me</h2>

            {groupedData.editor.map((doc) => (
                <SiderbarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>

            ))}
            </>
        )}

    </div>
        </>
    );
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
    <div className="md:hidden">
    <Sheet>
  <SheetTrigger>
    <MenuIcon size={40} className="p-2 hover:opacity-30 rounded-e-lg" />
  </SheetTrigger>
  <SheetContent side={'left'}>
    <SheetHeader>
      <SheetTitle>Menu</SheetTitle>

      <div>
        {/* Options */}
        {menuOptions}
      </div>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>

        <div className="hidden md:inline">
        {menuOptions}
        </div>
        

    </div>
  )
}
export default Sidebar