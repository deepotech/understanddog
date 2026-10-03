import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#b45309",
          borderRadius: "36px",
          color: "white",
          fontSize: "100px",
        }}
      >
        🐾
      </div>
    ),
    {
      ...size,
    }
  );
}
