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
      <div className="relative isolate overflow-hidden  px-6 sm:py-32 lg:overflow-visible h-full w-full">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
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
