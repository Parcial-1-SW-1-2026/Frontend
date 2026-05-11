import { useNavigate, useParams } from "@tanstack/react-router";
import { UI } from "@/config/constants";
import { JitsiRoom } from "@/features/supervision";

export default function SessionPage() {
  const { sessionId } = useParams({ from: "/session/$sessionId" });
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate({ to: "/supervision" });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-sm) var(--space-lg)",
          height: "var(--header-height)",
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--color-text)",
            }}
          >
            {UI.SESSION_TITLE}
          </h1>
          <span
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            ID: {sessionId.slice(0, 8)}
          </span>
        </div>
        <button
          onClick={handleLeave}
          style={{
            padding: "var(--space-sm) var(--space-lg)",
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text)",
            backgroundColor: "var(--color-danger)",
            borderRadius: "var(--radius-md)",
            transition: "opacity var(--transition-fast)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {UI.LEAVE_BUTTON}
        </button>
      </header>

      <main style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <JitsiRoom sessionId={sessionId} />
      </main>
    </div>
  );
}
