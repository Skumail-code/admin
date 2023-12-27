import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react"

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images
}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTitle(existingTitle || "");
        setDescription(existingDescription || "");
        setPrice(existingPrice || "");
    }, [existingTitle, existingDescription, existingPrice]);


    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });
        } else {
            await axios.post('/api/products', data);
        }

        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products')
    }

    async function uploadImage(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
          setIsUploading(true);
          const data = new FormData();
          for (const file of files) {
            data.append('file', file);
          }
          const res = await axios.post('/api/upload', data);
          setImages(oldImages => {
            return [...oldImages, ...res.data.links];
          });
          setIsUploading(false);
        }
      }

    return (
        <form onSubmit={saveProduct}>

            <label>Product name</label>
            <input type="text"
                placeholder="product name"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />
            <label>
                Photos
            </label>
            <div className="mb-2">
                <label className="w-24 h-24 cursor-pointer rounded-md bg-gray-200 flex items-center justify-center flex-col text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                <div>
                Upload
                </div>
                <input type="file" className="hidden" onChange={uploadImage}/>
                </label>
                {!images?.length && (
                    <div>No photos in this product</div>
                )}
            </div>
            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            ></textarea>

            <label>Price (in INR)</label>
            <input type="text"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)} />

            <button type="submit" className="btn-primary">Save</button>
        </form>
    );
}