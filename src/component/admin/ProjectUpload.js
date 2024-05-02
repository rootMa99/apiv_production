import { useState } from "react";
import c from "./ProjectUpload.module.css";
import pic from "../../assets/k9.jpg";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const ProjectUpload = (p) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showButton, setShowbutton] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const { login } = useSelector((s) => s.additionalData);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setShowbutton(true);
  };
  const handleUpload = () => {
    const jwtToken = login.token;
    if (selectedFile && jwtToken) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(`http://10.236.148.13:8081/admin/project/${p.title}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then(() => {
          setSuccessfully(true);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
      setShowbutton(false);
    }
  };
  if (successfully) {
    setTimeout(() => {
      setSuccessfully(false);
    }, 4000);
  }
  return (
    <div className={c.cardContainer}>
      {successfully && <Notification />}
      <h1 className={c.title}>{p.title}</h1>
      <div className={c.picContainer}>
        <div className={c.imageContainer}>
          {previewImage === null ? (
            <img
              src={p.img !== null ? p.img : pic}
              alt="some pic to describe project"
            />
          ) : (
            <img src={previewImage} alt="some pic to describe project" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={c.inputFile}
        />
      </div>
      {showButton && (
        <button className={c.button} onClick={handleUpload}>
          Send
        </button>
      )}
    </div>
  );
};

export default ProjectUpload;
