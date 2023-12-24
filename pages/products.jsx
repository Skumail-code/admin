import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
    return (
    <Layout>
        <Link href={'/products/new'} className="bg-gray-800 rounded-md py-1 px-2 text-white">Add new product</Link>
     </Layout>
    ) 
}