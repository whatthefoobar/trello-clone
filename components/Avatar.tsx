import React from "react";

interface AvatarProps {
  width: number;
  height: number;
  color: string;
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ width, height, color, name }) => {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div
      className={`w-${width} h-${height} rounded-full overflow-hidden flex items-center justify-center bg-blue-500 p-2 text-white `}
    >
      <p>{initials}</p>
    </div>
  );
};

export default Avatar;
