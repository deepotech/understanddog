import { ImageResponse } from "next/og";

export const alt = "UnderstandDog — Understand Your Dog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1917",
          backgroundImage: "radial-gradient(circle at 50% 40%, #451a03 0%, #1c1917 70%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "#d97706",
            marginBottom: "32px",
            fontSize: "44px",
          }}
        >
          🐾
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          <span>Understand</span>
          <span style={{ color: "#f59e0b" }}>Dog</span>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "#e7e5e4",
            marginBottom: "20px",
          }}
        >
          Understand Your Dog
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#a8a29e",
            maxWidth: "750px",
            lineHeight: 1.5,
          }}
        >
          Explore what your dog&apos;s sounds and behavior may mean with responsible canine bioacoustics.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
