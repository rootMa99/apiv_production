import React, { useRef, useState } from "react";
import c from "./UploadExcelData.module.css";
import cs from "./ProjectUpload.module.css";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import UploadLoading from "../ui/UploadLoading";

const UploadAdminPic = (p) => {
  const dropContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [showButton, setShowbutton] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useSelector((s) => s.additionalData);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    dropContainerRef.current.classList.add("drag-active");
  };

  const handleDragLeave = () => {
    dropContainerRef.current.classList.remove("drag-active");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropContainerRef.current.classList.remove("drag-active");
    fileInputRef.current.files = e.dataTransfer.files;
    setFile(e.dataTransfer.files[0]);
    const imageUrl = URL.createObjectURL(e.dataTransfer.files[0]);
    setPreviewImage(imageUrl);
    setShowbutton(true);
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(imageUrl);
    setShowbutton(true);
  };

  const handleButtonClick = () => {
    setLoading(true);
    const jwtToken = login.token;
    if (file && jwtToken) {
      const formData = new FormData();
      formData.append("file", file);
      fetch(`http://10.236.148.13:8081/admin/adminpic`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
          setSuccessfully(true);
          setShowbutton(false);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setError(true);
          setLoading(false);
        });
    }
  };

  if (successfully) {
    setTimeout(() => {
      setSuccessfully(false);
    }, 4000);
  }
  if (error) {
    setTimeout(() => {
      setError(false);
    }, 8000);
  }
  console.log(file);
  return (
    <div className={c.wrap}>
      {successfully && <Notification />}
      {error && <Notification error={true} />}
      {previewImage !== null && (
        <div className={c.imageHolder}>
          <img src={previewImage} alt="some pic to describe project" />
        </div>
      )}
      <label
        htmlFor="images"
        className={c["drop-container"]}
        ref={dropContainerRef}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        id="dropcontainer"
      >
        {loading ? (
          <UploadLoading />
        ) : (
          <React.Fragment>
            <span className={c["drop-title"]}>Drop image here</span>
            or
            <input
              type="file"
              id="images"
              ref={fileInputRef}
              accept="image/*"
              onChange={fileChangeHandler}
              required
            />
          </React.Fragment>
        )}
      </label>
      {showButton && (
        <button className={cs.button} onClick={handleButtonClick}>
          Upload File
        </button>
      )}
    </div>
  );
};

export default UploadAdminPic;
