import React, { useEffect, useState } from "react";

const Captcha = () => {
  const [captcha, setCaptcha] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchRandomCaptcha();
  }, []);

  const fetchRandomCaptcha = async () => {
    try {
      const response = await fetch(
        "http://localhost:8089/captcha/random-captcha"
      );
      const data = await response.json();
      setCaptcha(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du captcha :", error);
    }
  };

  const handleImageClick = (image) => {
    if (image.question_associee) {
      setSelectedImage(image);
    }
  };

  const handleCaptchaSubmit = () => {
    if (selectedImage) {
      // Effectuer la validation du captcha
      console.log("Captcha validé ! Redirection vers la page de connexion...");
      // Effectuer la redirection vers la page de connexion
    } else {
      console.log(
        "Sélectionnez une image avec la question associée pour valider le captcha."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Captcha</h1>
      {captcha && (
        <div>
          <h2 className="text-lg font-bold mb-2">Thème: {captcha.theme}</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {captcha.images.map((image) => (
              <img
                key={image.url_image}
                src={image.url_image}
                alt={image.nom_image}
                onClick={() => handleImageClick(image)}
                className={`w-full h-auto cursor-pointer transition-opacity ${
                  selectedImage === image
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              />
            ))}
          </div>
          <p className="mb-2">Question : {selectedImage?.question_associee}</p>
          <button
            onClick={handleCaptchaSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Valider
          </button>
        </div>
      )}
    </div>
  );
};

export default Captcha;
