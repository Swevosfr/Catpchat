import React, { useState } from "react";

export default function UserCaptcha() {
  const [captchaName, setCaptchaName] = useState("");
  const [theme, setTheme] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [images, setImages] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleCaptchaNameChange = (e) => {
    setCaptchaName(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleNewThemeChange = (e) => {
    setNewTheme(e.target.value);
  };

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form data
    const formData = new FormData();
    formData.append("captchaName", captchaName);
    formData.append("theme", theme);
    formData.append("newTheme", newTheme);
    formData.append("questions", JSON.stringify(questions));

    // Append images to form data
    images.forEach((image, index) => {
      formData.append(`files`, image, image.name);
    });

    // Submit the form data to the server using fetch or axios
    fetch("/upload-captcha", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error
        console.log(data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {" "}
      <form onSubmit={handleSubmit} className="py-10 lg:pl-72 h-full w-full">
        <div>
          <label htmlFor="captchaName">Captcha Name:</label>
          <input
            type="text"
            id="captchaName"
            value={captchaName}
            onChange={handleCaptchaNameChange}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme:</label>
          <select id="theme" value={theme} onChange={handleThemeChange}>
            <option value="">Choose a theme</option>
            <option value="nouveau">New Theme</option>
            {/* Render existing themes from backend */}
          </select>
        </div>
        {theme === "nouveau" && (
          <div>
            <label htmlFor="newTheme">New Theme:</label>
            <input
              type="text"
              id="newTheme"
              value={newTheme}
              onChange={handleNewThemeChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="imageUpload">Images:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            <input
              type="text"
              value={questions[index] || ""}
              onChange={(e) => handleQuestionChange(e, index)}
            />
          </div>
        ))}
        <button type="submit">Create Captcha</button>
      </form>
    </div>
  );
}
