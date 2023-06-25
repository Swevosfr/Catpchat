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
      <h2 className="text-2xl font-bold mb-4">Captcha</h2>
      {captcha && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {captcha.images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-32 bg-gray-200"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.url_image}
                  alt={image.nom_image}
                  className="max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
          <p className="mt-4">{captcha.question}</p>
        </>
      )}
      {!captcha && <p>Loading...</p>}
    </div>
  );
};

export default Captcha;
