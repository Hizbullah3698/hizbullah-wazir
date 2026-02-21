import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Hizbullah Wazir — Frontend React Developer";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",
                    fontFamily: "monospace",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            "radial-gradient(ellipse at 20% 50%, rgba(88, 166, 255, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
                        display: "flex",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            fontSize: "72px",
                            fontWeight: 800,
                            background: "linear-gradient(90deg, #58A6FF, #8B5CF6, #39D353)",
                            backgroundClip: "text",
                            color: "transparent",
                            display: "flex",
                        }}
                    >
                        Hizbullah Wazir
                    </div>
                    <div
                        style={{
                            fontSize: "28px",
                            color: "#8B949E",
                            display: "flex",
                        }}
                    >
                        Frontend React Developer
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "24px",
                            marginTop: "20px",
                            fontSize: "18px",
                            color: "#484F58",
                        }}
                    >
                        <span style={{ display: "flex" }}>React 19</span>
                        <span style={{ color: "#58A6FF", display: "flex" }}>·</span>
                        <span style={{ display: "flex" }}>TypeScript</span>
                        <span style={{ color: "#58A6FF", display: "flex" }}>·</span>
                        <span style={{ display: "flex" }}>Next.js</span>
                        <span style={{ color: "#58A6FF", display: "flex" }}>·</span>
                        <span style={{ display: "flex" }}>AI Integration</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
