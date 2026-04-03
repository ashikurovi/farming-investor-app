"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+86px)] right-4 z-50 md:bottom-8 md:right-6">
      {/* Pulsing rings */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]/30"
        animate={{ scale: [1, 1.7, 1.7], opacity: [0.6, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]/20"
        animate={{ scale: [1, 2.2, 2.2], opacity: [0.4, 0, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.4,
        }}
      />

      {/* Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: 0.3,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
          >
            {/* Shine overlay */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />

            {/* WhatsApp SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 drop-shadow"
            >
              <path
                fillRule="evenodd"
                d="M12.031 2.016c5.523 0 10.006 4.484 10.006 10.01 0 5.525-4.483 10.009-10.006 10.009-1.767 0-3.46-.465-4.954-1.319l-5.066 1.328 1.347-4.94A9.974 9.974 0 0 1 2.025 12.026C2.025 6.501 6.508 2.016 12.031 2.016zm0 1.666a8.349 8.349 0 0 0-8.343 8.344c0 1.65.431 3.23 1.253 4.63l.206.353-1.049 3.847 3.93-1.03.344.2c1.353.792 2.894 1.21 4.469 1.21 4.607 0 8.344-3.738 8.344-8.345 0-4.607-3.737-8.344-8.344-8.344zm4.276 11.23c-.234-.117-1.383-.682-1.597-.76-.214-.078-.369-.117-.525.117-.156.234-.602.76-.738.916-.136.155-.272.175-.506.059-.234-.117-.987-.364-1.88-1.162-.695-.62-1.164-1.386-1.3-1.62-.136-.234-.015-.36.102-.477.106-.105.234-.272.35-.408.117-.136.155-.234.233-.39.078-.155.039-.292-.02-.408-.058-.117-.524-1.264-.717-1.73-.189-.452-.38-.39-.525-.398-.136-.008-.291-.008-.446-.008-.156 0-.408.058-.622.292-.213.233-.815.797-.815 1.944 0 1.147.834 2.255.95 2.411.117.155 1.644 2.508 3.985 3.518.556.241.99.385 1.33.493.56.178 1.07.153 1.472.093.447-.067 1.383-.565 1.577-1.11.194-.545.194-1.01.136-1.11-.059-.098-.214-.156-.448-.273z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
