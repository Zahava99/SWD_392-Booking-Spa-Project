import React, { useState } from "react";

const CustomButton = ({
  icon: Icon,
  text,
  iconSize = "24px",
  iconColor = "#000",
  textColor = "#000",
  containerStyle = {},
  iconPosition = "left",
  fontSize = "16px",
  padding = "10px 20px",
  hoverStyle = {},
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        padding,
        ...containerStyle,
        ...(isHovered ? hoverStyle : {}),
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {Icon && iconPosition === "left" && (
        <Icon
          size={iconSize}
          style={{ marginRight: "8px", color: iconColor }}
        />
      )}
      <span style={{ fontSize, color: textColor }}>{text}</span>
      {Icon && iconPosition === "right" && (
        <Icon size={iconSize} style={{ marginLeft: "8px", color: iconColor }} />
      )}
    </button>
  );
};

export default CustomButton;
