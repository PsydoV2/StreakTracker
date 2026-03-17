"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

interface BreadcrumbProps {
  current: string;
}

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/" className="breadcrumbBack">
        <FaChevronLeft size={12} />
        <span>Home</span>
      </Link>
      <span className="breadcrumbSeparator">/</span>
      <span className="breadcrumbCurrent">{current}</span>
    </nav>
  );
}
