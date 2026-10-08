"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDate(getBanglaDate()), 0);
    return () => clearTimeout(timeout);
  }, []);

  return <span>{date}</span>;
}