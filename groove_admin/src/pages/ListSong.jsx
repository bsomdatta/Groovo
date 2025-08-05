import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error fetching songs");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold mb-4">All Songs List</p>

      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] sm:grid-cols[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
        >
          <img
            src={item.image}
            alt="song"
            className="w-12 h-12 rounded object-cover"
          />
          <p>{item.name}</p>
          <p>{item.album || "N/A"}</p>
          <p>{item.duration}</p>
          <p
            className="text-red-500 hover:underline cursor-pointer "
            onClick={() => removeSong(item._id)}
          >
            Delete
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListSong;
