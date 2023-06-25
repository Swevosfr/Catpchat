import React, { useEffect, useState } from "react";
import axios from "axios";

const Captcha = ({ setCaptchaDone, onClose }) => {
  const [captcha, setCaptcha] = useState(null);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      window.location.reload(); // Rafraîchit la page lorsque le compte à rebours atteint 0 secondes
    }

    return () => clearInterval(timer);
  }, [countdown]);

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
      setCaptchaDone(true);
      onClose();
    } else if (countdown > 0) {
      // L'utilisateur s'est trompé d'image et le décompte n'est pas encore arrivé à 0, décrémenter le décompte de 5 secondes
      setCountdown((prevCountdown) =>
        prevCountdown > 5 ? prevCountdown - 5 : 0
      );
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {captcha && (
        <div className="bg-white p-4 rounded">
          <div className="flex items-center justify-center mb-4">
            <span className="text-lg font-bold text-gray-600">
              Temps restant : {countdown}s
            </span>
          </div>
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
