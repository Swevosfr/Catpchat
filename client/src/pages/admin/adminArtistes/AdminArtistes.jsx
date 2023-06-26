import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div div className=" min-h-screen w-full bg-white">
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
                  Prénom
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Nom
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.user_email} className="border-b">
                  <td className="py-3 px-4 text-sm text-black text-center border-r">
                    {artist.user_first_name}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center border-r">
                    {artist.user_last_name}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {artist.user_email}
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
