"use client";
import { useState, useEffect } from "react";
import Heading from "@/app/(components)/Heading";
import { createRoom } from "@/app/actions/createRoom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/userContext";



function AddRoomsPage() {
  const router = useRouter();
  const [state, setState] = useState({ success: false, error: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const {userId}=useAuthContext()

  useEffect(() => {
    if (state.success) {
      toast.success('Room created successfully.');
      router.push('/');
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set('image', imageBase64);
    formData.set('user_id', userId);

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3000/api/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setState(result);
    } catch (error) {
      setState({ success: false, error: 'Failed to create room' });
    }
  };

  

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <Heading title="Add a Room" />
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="image" value={imageBase64} />

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Room Name</label>
          <input type="text" id="name" name="name" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea id="description" name="description" className="border rounded w-full h-24 py-2 px-3" required></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="sqft" className="block text-gray-700 font-bold mb-2">Square Feet</label>
          <input type="number" id="sqft" name="sqft" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">Capacity</label>
          <input type="number" id="capacity" name="capacity" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="price_per_hour" className="block text-gray-700 font-bold mb-2">Price Per Hour</label>
          <input type="number" id="price_per_hour" name="price_per_hour" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
          <input type="text" id="address" name="address" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
          <input type="text" id="location" name="location" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="availability" className="block text-gray-700 font-bold mb-2">Availability</label>
          <input type="text" id="availability" name="availability" className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label htmlFor="amenities" className="block text-gray-700 font-bold mb-2">Amenities</label>
          <input type="text" id="amenities" name="amenities" className="border rounded w-full py-2 px-3" required />
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
          <input type="file" id="image" className="border rounded w-full py-2 px-3" onChange={handleChangeImage} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <div className="flex flex-col gap-5">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRoomsPage;
