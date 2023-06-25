import React, { useEffect, useState } from "react";
import axios from "axios";

const Captcha = ({ captchaId }) => {
  const [captcha, setCaptcha] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données du captcha par son ID
    const fetchCaptcha = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/captcha/${captchaId}`
        );
        setCaptcha(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCaptcha();
  }, [captchaId]);

  if (!captcha) {
    return <div>Loading...</div>;
  }

  const singularImage = captcha.images.find(
    (image) => image.question_associee !== null
  );
  const otherImages = captcha.images.filter(
    (image) => image.question_associee === null
  );

  return (
    <div>
      <h2 className="text-2xl font-bold">{captcha.nom_captcha}</h2>
      <h3 className="text-lg">Theme: {captcha.theme}</h3>
      <div className="flex flex-wrap justify-center">
        {otherImages.map((image) => (
          <img
            key={image.nom_image}
            src={image.url_image}
            alt={image.nom_image}
            className="w-24 h-24 m-2"
          />
        ))}
        <div className="singular-image w-24 h-24 m-2">
          <img
            src={singularImage.url_image}
            alt={singularImage.nom_image}
            className="w-full h-full"
          />
          <div className="question text-center mt-2">
            {singularImage.question_associee}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Captcha;
