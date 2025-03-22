import clsx from "clsx";
import React from "react";

// variants - default | gray | green
export default function CustomButton({
  title,
  variant = "default",
  className,
  ...props
}) {
  return (
    <button
      className={clsx("custom_button", `custom_button_${variant}`, className)}
      {...props}
    >
      {title}
    </button>
  );
}
