import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const AdminArtistes = () => {
  const [captchas, setCaptchas] = useState([]);

  useEffect(() => {
    fetchCaptchas();
  }, []);

  const fetchCaptchas = async () => {
    try {
      const response = await axios.get("http://localhost:8089/admin/captchas");
      setCaptchas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCaptcha = async (id) => {
    try {
      await axios.delete(`http://localhost:8089/captcha/captcha/${id}`);
      setCaptchas((prevCaptchas) =>
        prevCaptchas.filter((captcha) => captcha.id_captcha !== id)
      );
      console.log("Captcha supprimé avec l'ID :", id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Liste des Captchas
        </h1>
        <div className="overflow-x-auto">
          <table className="w-2/3 mx-auto bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  ID Captcha
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Nom Captcha
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Thème
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Prénom
                </th>
                <th className="py-3 px-4 border-b font-semibold text-sm text-black text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {captchas.map((captcha) => (
                <tr key={captcha.id_captcha} className="border-b">
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {captcha.id_captcha}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {captcha.nom_captcha}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {captcha.theme}
                  </td>
                  <td className="py-3 px-4 text-sm text-black text-center">
                    {captcha.user_first_name}
                  </td>
                  <td className="py-3 px-4 text-sm text-center">
                    <button
                      onClick={() => handleDeleteCaptcha(captcha.id_captcha)}
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
