type SocialPreviewProps = Readonly<{
  title: string;
  subtitle: string;
  detail: string;
  footer: string;
  accent: string;
  glow: string;
}>;

export function SocialPreview({
  title,
  subtitle,
  detail,
  footer,
  accent,
  glow,
}: SocialPreviewProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(99,102,241,0.35), transparent 30%), radial-gradient(circle at top right, rgba(34,211,238,0.24), transparent 34%), linear-gradient(135deg, #0b1018 0%, #111827 52%, #050816 100%)",
        color: "#eef2ff",
        padding: 56,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.65), transparent 80%)",
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 72,
          width: 220,
          height: 220,
          borderRadius: 999,
          background: accent,
          filter: "blur(18px)",
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 36,
          padding: 40,
          background:
            "linear-gradient(180deg, rgba(17,24,39,0.88), rgba(9,14,23,0.92))",
          boxShadow: "0 28px 80px rgba(0, 0, 0, 0.45)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: accent,
              boxShadow: `0 0 0 8px ${glow}`,
            }}
          />
          <span
            style={{
              fontSize: 24,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(226,232,240,0.74)",
            }}
          >
            Portfolio Preview
          </span>
        </div>

        <div style={{ maxWidth: 880 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.05em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 34,
              lineHeight: 1.15,
              color: "#93c5fd",
              maxWidth: 860,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              lineHeight: 1.35,
              color: "rgba(226,232,240,0.82)",
              maxWidth: 920,
            }}
          >
            {detail}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            color: "rgba(226,232,240,0.72)",
          }}
        >
          <span>{footer}</span>
          <span
            style={{
              padding: "12px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "#f8fafc",
            }}
          >
            Next.js · React · TypeScript
          </span>
        </div>
      </div>
    </div>
  );
}
