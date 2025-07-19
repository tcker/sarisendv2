'use client'
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function Homebtn() {
    const router = useRouter()
    
    return (
        <button 
            className="p-2 bg-white text-black rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => router.push("/home")}
        >
            <ArrowLeft className="w-6 h-6" />
        </button>  
    )
}
