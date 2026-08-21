import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#18211f", color: "#f3eee4", fontFamily: "sans-serif", fontSize: 19, fontWeight: 700, letterSpacing: "-0.04em" }}>
      G/S
    </div>,
    size,
  );
}
