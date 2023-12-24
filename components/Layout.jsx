import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"



export default function Layout({children}) {
  const { data: session } = useSession()
  if(!session) {
    return (
      <div className="bg-gray-800 w-screen h-screen flex items-center">
        <div className="text-center w-full">
        <button className="bg-white p-2 px-4 rounded-lg" onClick={() => signIn('google')}>Login with Google </button>
        </div>
      </div>
    )
  }
  return (
    
    <div className="bg-gray-800  min-h-screen  flex">
      <Nav /> 
      <div className="bg-white flex-grow m-1 mr-1 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  )
}
