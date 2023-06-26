import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const AdminArtistes = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get("http://localhost:8089/admin/artistes");
      setArtists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteArtist = async (id) => {
    try {
      await axios.delete(`http://localhost:8089/admin/users/${id}`);
      setArtists((prevArtists) =>
        prevArtists.filter((artist) => artist.id_user !== id)
      );
      console.log("Artiste supprimé avec l'ID :", id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Liste des Artistes
        </h1>
        <div className="overflow-x-auto">
          <table className="w-2/3 mx-auto bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  ID
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Prénom
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Nom
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Email
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.id_user} className="border-b">
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {artist.id_user}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {artist.user_first_name}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {artist.user_last_name}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {artist.user_email}
                  </td>
                  <td className="py-3 px-4 text-sm text-center">
                    <button
                      onClick={() => handleDeleteArtist(artist.id_user)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <AiOutlineClose className="h-5 w-5 transform hover:scale-110" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminArtistes;
