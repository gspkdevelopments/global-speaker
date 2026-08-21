import type { NextConfig } from "next";

const useStaticExport = process.env.GLOBAL_SPEAKER_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: useStaticExport ? "export" : undefined,
  trailingSlash: useStaticExport ? true : undefined,
};

export default nextConfig;
