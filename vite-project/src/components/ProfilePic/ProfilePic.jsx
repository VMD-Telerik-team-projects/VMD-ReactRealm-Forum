import PropTypes from "prop-types";

export default function ProfilePic({profilePic, widthAndHeight }) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: widthAndHeight,
        height: widthAndHeight,
        overflow: "hidden",
        background: "transparent",
      }}
      className="rounded-circle m-0"
    >
      <img
        src={profilePic}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        alt="img"
        className="border border-2 border-muted rounded-circle"
      />
    </div>
  );
}

ProfilePic.propTypes = {
  profilePic: PropTypes.string,
  widthAndHeight: PropTypes.string
}
