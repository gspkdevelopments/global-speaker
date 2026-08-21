import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Global Speaker — Speak more of the world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f1eadc", color: "#1c2523", padding: "72px", fontFamily: "serif", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "66%" }}>
        <div style={{ display: "flex", fontFamily: "sans-serif", fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase" }}>Global Speaker · EN / FR / ES</div>
        <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontSize: 94, lineHeight: 0.93 }}>Speak more<br />of the world.</div><div style={{ display: "flex", fontFamily: "sans-serif", fontSize: 26, marginTop: 36 }}>Language begins with your life.</div></div>
      </div>
      <div style={{ width: "34%", background: "#bf5b42", marginLeft: 50, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}><div style={{ width: 210, height: 210, borderRadius: "50%", background: "#e8b45b", display: "flex" }} /><div style={{ position: "absolute", bottom: 36, right: 34, fontFamily: "sans-serif", fontSize: 18, color: "#fff" }}>life → language</div></div>
    </div>,
    size,
  );
}
