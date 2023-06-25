import React, { useEffect, useState } from "react";
import axios from "axios";

const Captcha = () => {
  const [captcha, setCaptcha] = useState(null);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8089/captcha/random-captcha"
      );
      setCaptcha(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    if (image.question_associee) {
      // L'utilisateur a cliqué sur l'image contenant une question
      // Vous pouvez effectuer ici les actions nécessaires pour valider le captcha

      // Redirection vers la page de connexion
      // Remplacez '/login' par l'URL de votre page de connexion
      window.location.href = "/login";
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {captcha && (
        <div className="bg-white p-4 rounded">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            {
              captcha.images.find((image) => image.question_associee)
                ?.question_associee
            }
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {captcha.images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-32 bg-gray-200 transition-transform duration-300 transform hover:scale-110"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.url_image}
                  alt={image.url_image}
                  className="max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {!captcha && <p>Loading...</p>}
    </div>
  );
};

export default Captcha;
