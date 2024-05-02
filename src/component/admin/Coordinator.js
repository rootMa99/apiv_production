import styles from "../coordinator/Coordinator.module.css";
import c from "./ProjectUpload.module.css";
import apticlogo from "../../assets/aptiv-logo.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const Coordinator = (p) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showButton, setShowbutton] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [error, setError] = useState(false);
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
      if (p.level === "coordinator") {
        fetch(`http://10.236.148.13:8081/admin/coordinator/${p.name}`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            setSuccessfully(true);
            setShowbutton(false);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            setError(true);
          });
      } else {
        fetch(`http://10.236.148.13:8081/admin/shiftleader/${p.name}`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            setSuccessfully(true);
            setShowbutton(false);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            setError(true);
          });
      }
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
  return (
    <div>
      {successfully && <Notification />}
      {error && <Notification error={true} />}
      <div
        className={styles["full-card"]}
        style={
          p.level === "coordinator" || p.level === "fa"
            ? { width: "20rem" }
            : {}
        }
      >
        <div className={styles["full-card-top"]}>
          <div
            className={styles["coordinator-info"]}
            style={
              p.level === "coordinator" || p.level === "fa"
                ? { lineHeight: "2rem", fontWeight: 500 }
                : {}
            }
          >
            <div
              className={styles["coordinator-eff"]}
              style={
                p.level === "coordinator" || p.level === "fa"
                  ? { fontSize: "2rem" }
                  : {}
              }
            >
              <span>90%</span>
            </div>
            <div
              className={styles["eff-title"]}
              style={
                p.level === "coordinator" || p.level === "fa"
                  ? { fontSize: "2rem" }
                  : {}
              }
            >
              <span>eff</span>
            </div>
            <div
              className={styles["aptiv-log"]}
              style={
                p.level === "coordinator"
                  ? { width: "6rem", height: "3rem" }
                  : p.level === "fa"
                  ? { width: "19rem", height: "8rem" }
                  : {}
              }
            >
              <img src={apticlogo} alt="aptiv" draggable="false" />
            </div>
          </div>
          <div
            className={styles["coordinator-pic"]}
            style={
              p.level === "coordinator" || p.level === "fa"
                ? { width: "250px", height: "250px" }
                : {}
            }
          >
            {previewImage === null ? (
              <img src={p.pic} alt={p.level} draggable="false" />
            ) : (
              <img src={previewImage} alt={p.level} draggable="false" />
            )}
            <div className={styles["poste-title"]}>
              <span>{p.level}</span>
            </div>
          </div>
        </div>
        <div className={styles["full-card-bottom"]}>
          <div className={styles["coordinator-infos"]}>
            <div
              className={styles["coordinator-name"]}
              style={
                p.level === "coordinator" || p.level === "fa"
                  ? { fontSize: "2rem" }
                  : {}
              }
            >
              <span>{p.name}</span>
            </div>
            <div className={styles["coordinator-features"]}>
              <div
                className={styles["coordinator-features-col"]}
                style={
                  p.level === "coordinator" || p.level === "fa"
                    ? { paddingBottom: "1rem" }
                    : {}
                }
              >
                <span>
                  <div
                    className={styles["coordinator-feature-value"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    90%
                  </div>
                  <div
                    className={styles["coord-feature-title"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    eff
                  </div>
                </span>
                <span>
                  <div
                    className={styles["coordinator-feature-value"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    +12%
                  </div>
                  <div
                    className={styles["coord-feature-title"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    gap
                  </div>
                </span>
                <span>
                  <div
                    className={styles["coordinator-feature-value"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    78
                  </div>
                  <div
                    className={styles["coord-feature-title"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    hc
                  </div>
                </span>
              </div>
              <div
                className={styles["coordinator-features-col"]}
                style={
                  p.level === "coordinator" || p.level === "fa"
                    ? { paddingBottom: "1rem" }
                    : {}
                }
              >
                <span>
                  <div
                    className={styles["coordinator-feature-value"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    3000pc
                  </div>
                  <div
                    className={styles["coord-feature-title"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    output
                  </div>
                </span>
                <span>
                  <div
                    className={styles["coordinator-feature-value"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    50min
                  </div>
                  <div
                    className={styles["coord-feature-title"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    wsd
                  </div>
                </span>
                <span>
                  <div
                    className={styles["coordinator-feature-value"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    56s/gr
                  </div>
                  <div
                    className={styles["coord-feature-title"]}
                    style={
                      p.level === "coordinator" || p.level === "fa"
                        ? { fontSize: "1rem" }
                        : {}
                    }
                  >
                    scrap
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={c.inputFile}
      />
      {showButton && (
        <button className={c.button} onClick={handleUpload}>
          Send
        </button>
      )}
    </div>
  );
};

export default Coordinator;
