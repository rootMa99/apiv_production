import c from "./Notification.module.css";

const Notification = (p) => {
  return (
    <div
      className={c.notification}
      style={p.error && { backgroundColor: "#B70404" }}
    >
      <p>
        {p.error
          ? "We're having trouble connecting to the server. Please check your internet connection and try again, (If the problem persists, please contact us) "
          : p.file
          ? "The Excel File has been successfully uploaded."
          : "The picture has been successfully uploaded."}
      </p>
    </div>
  );
};

export default Notification;
