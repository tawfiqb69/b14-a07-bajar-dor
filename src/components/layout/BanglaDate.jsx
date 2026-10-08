"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getBanglaDate());
  }, []);

  return <span>{date}</span>;
}