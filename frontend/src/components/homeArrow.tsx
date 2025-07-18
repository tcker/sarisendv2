import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function Homebtn() {
    const navigate = useNavigate()
    
    return (
        <button 
            className="p-2 bg-white text-black rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => navigate("/Home")}
        >
            <ArrowLeft className="w-6 h-6" />
        </button>  
    )
}
