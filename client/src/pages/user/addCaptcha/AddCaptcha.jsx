import React, { useState } from "react";

const CreateCaptchaForm = () => {
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
    setQuestions(new Array(selectedImages.length).fill(""));
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
    <div className="min-h-screen w-full bg-white py-10 lg:pl-72">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow"
      >
        <div className="mb-4">
          <label htmlFor="captchaName" className="block mb-2 font-medium">
            Captcha Name:
          </label>
          <input
            type="text"
            id="captchaName"
            value={captchaName}
            onChange={handleCaptchaNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="theme" className="block mb-2 font-medium">
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Choose a theme</option>
            <option value="nouveau">New Theme</option>
            {/* Render existing themes from backend */}
          </select>
        </div>
        {theme === "nouveau" && (
          <div className="mb-4">
            <label htmlFor="newTheme" className="block mb-2 font-medium">
              New Theme:
            </label>
            <input
              type="text"
              id="newTheme"
              value={newTheme}
              onChange={handleNewThemeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="images" className="block mb-2 font-medium">
            Images:
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
        {images.length > 0 && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Questions:</label>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Captcha Image ${index + 1}`}
                  className="w-20 h-20 mb-2"
                />
                <input
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  value={questions[index] || ""}
                  onChange={(e) => handleQuestionChange(e, index)}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Captcha
        </button>
      </form>
    </div>
  );
};

export default CreateCaptchaForm;
