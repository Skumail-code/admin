import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";



export default function Home() {
  const { data: session } = useSession();
  return <Layout>
    <div className="text-gray-800 flex justify-between">
      <h2>Hello, <b>{session?.user?.name}</b></h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt='' referrerpolicy="no-referrer" className="w-6 h-6" />
        {session?.user?.name}
        <span className="px-2">
         
        </span>
      </div>

    </div>
  </Layout>
}
