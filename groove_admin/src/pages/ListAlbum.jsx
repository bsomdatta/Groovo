import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  // Fetch all albums
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      toast.error("Error occurred while fetching albums");
      console.error(
        "Fetch Albums Error:",
        error.response?.data || error.message
      );
    }
  };

  // Remove album by ID
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(
        `${url}/api/album/remove`,
        { id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Album removed");
        fetchAlbums(); // Refresh list
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      toast.error("Error occurred while deleting album");
      console.error(
        "Remove Album Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold mb-4">All Albums List</p>

      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album Color</b>
        <b>Action</b>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
        >
          <img
            className="w-12 h-12 object-cover rounded"
            src={item.image}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>{item.desc}</p>
          <input type="color" value={item.bgColor} disabled />
          <p
            className="text-red-500 hover:underline cursor-pointer"
            onClick={() => removeAlbum(item._id)}
          >
            Delete
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListAlbum;
