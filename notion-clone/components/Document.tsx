'use client'
import { FormEvent, useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Editor from "./Editor"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "./DeleteDocument"
import InviteUser from "./InviteUser"

function Document({id}: {id:string}) {
    const [data, loading, error] = useDocumentData(doc(db, "document", id))
    const [input, setInput] = useState("")
    const [isUpdating, startTransition] = useTransition()

    const isOwner = useOwner()
    useEffect(() => {
        if(data){
            setInput(data.title)
        }
    }, [data])

    // Updating Title
    const updateTitle = (e: FormEvent) => {
        e.preventDefault()
        if(input.trim()){
            startTransition(async () => {
                await updateDoc(doc(db, "document",id), {
                    title: input,
                });
            })
        }
    }
  return (
    <div className="flex-1 h-full bg-white p-5">

        <div className="flex max-w-6xl mx-auto justify-between pb-5">
            {/* Updating title */}
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
        <Input value={input} onChange={(e) => setInput(e.target.value)}/>
        
        <Button type="submit" disabled={isUpdating}>{isUpdating?"Updating...": "Update"}</Button>

        {/* If */}

        {isOwner && (
            <>
            {/* Invite user */}
            <InviteUser/>
            {/* Delete document */}
            <DeleteDocument/>

            </>
        )}
        </form>
        </div>

        <hr className="pb-10"/>
        {/* Collaborative document */}
        <Editor/>


    </div>
  )
}
export default Document