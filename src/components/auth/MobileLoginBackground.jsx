"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useGetGlarryQuery } from "@/features/admin/glarry/glarryApiSlice";

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export function MobileLoginBackground() {
  const { data: galleryData } = useGetGlarryQuery({ limit: 6 });
  const items = galleryData?.items ?? galleryData ?? [];

  const images = useMemo(() => {
    const cleanUrl = (u) =>
      typeof u === "string" ? u.replace(/[`]/g, "").trim() : "";
    return items
      .map((item) => cleanUrl(item?.photoUrl || item?.photo))
      .filter(Boolean);
  }, [items]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [images.length]);

  const src = images[index] || FALLBACK_IMAGE;

  return (
    <div className="absolute inset-0 z-0 lg:hidden">
      <Image
        src={src}
        alt="Farm Landscape"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px]" />
    </div>
  );
}

