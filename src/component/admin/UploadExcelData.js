import React, { useRef, useState } from "react";
import c from "./UploadExcelData.module.css";
import cs from "./ProjectUpload.module.css";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import UploadLoading from "../ui/UploadLoading";

const UploadExcelData = (p) => {
  const dropContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [showButton, setShowbutton] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useSelector((s) => s.additionalData);
  const [loading, setLoading] = useState(false);

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
    setShowbutton(true);
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    setShowbutton(true);
  };

  const handleButtonClick = () => {
    setLoading(true);
    setShowbutton(false);

    const jwtToken = login.token;
    const formData = new FormData();
    formData.append("file", file);
    fetch(`http://10.236.148.13:8081/admin/uploadData`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        setSuccessfully(true);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
        setShowbutton(true);
        throw new Error(`Request failed with status: ${response.status}`);
      }
    });
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
  return (
    <div className={c.wrap}>
      {successfully && <Notification file={true} />}
      {error && <Notification error={true} />}
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
            <span className={c["drop-title"]}>Drop excel file here</span>
            or
            <input
              type="file"
              id="images"
              ref={fileInputRef}
              accept=".xlsx"
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

export default UploadExcelData;
