import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/concerts">Concerts</Link>
        </li>
      </ul>
    </nav>
  );
}
