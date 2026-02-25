import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Turbopack to treat this folder as the app root
  turbopack: {
    root: __dirname,
  },
  // React Compiler disabled for now
  reactCompiler: false,
};

export default nextConfig;
