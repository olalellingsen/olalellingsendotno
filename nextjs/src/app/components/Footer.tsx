import React from "react";

export default function Footer() {
  return (
    <footer className="p-8 flex justify-center items-center">
      <p className="text-gray-400">
        © {new Date().getFullYear()} Ola Lømo Ellingsen
      </p>
    </footer>
  );
}
