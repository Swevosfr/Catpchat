import React, { useState, useEffect } from "react";

const CreateCaptchaForm = () => {
  const [captchaName, setCaptchaName] = useState("");
  const [theme, setTheme] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [images, setImages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    // Récupérer les thèmes disponibles depuis le backend
    fetch("http://localhost:8089/captcha/themes")
      .then((response) => response.json())
      .then((data) => {
        setThemes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    <div className=" min-h-screen w-full bg-white">
      <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible py-10 lg:pl-72 h-full w-full">
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
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className=" p-4">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-10">
                Créez votre captcha !
              </h1>
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-4 bg-white rounded shadow"
              >
                <div className="mb-4">
                  <label
                    htmlFor="captchaName"
                    className="block mb-2 font-medium"
                  >
                    Nom de votre captcha :
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
                    Son theme :
                  </label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={handleThemeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Choose a theme</option>
                    <option value="nouveau">New Theme</option>
                    {themes.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </div>
                {theme === "nouveau" && (
                  <div className="mb-4">
                    <label
                      htmlFor="newTheme"
                      className="block mb-2 font-medium"
                    >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCaptchaForm;
