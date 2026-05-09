import { useNavigate } from "@tanstack/react-router";
import { UI } from "@/config/constants";

export default function HomePage() {
  const navigate = useNavigate();

  const handleCreateSession = () => {
    const sessionId = crypto.randomUUID();
    navigate({ to: "/session/$sessionId", params: { sessionId } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "var(--space-lg)",
        padding: "var(--space-xl)",
      }}
    >
      <h1
        style={{
          fontSize: "var(--font-size-3xl)",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--color-text)",
          textAlign: "center",
        }}
      >
        {UI.HOME_TITLE}
      </h1>
      <p
        style={{
          fontSize: "var(--font-size-lg)",
          color: "var(--color-text-muted)",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        {UI.HOME_SUBTITLE}
      </p>
      <button
        onClick={handleCreateSession}
        style={{
          padding: "var(--space-md) var(--space-xl)",
          fontSize: "var(--font-size-lg)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text)",
          backgroundColor: "var(--color-primary)",
          borderRadius: "var(--radius-md)",
          transition: "background-color var(--transition-fast)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary)")
        }
      >
        {UI.CREATE_SESSION_BUTTON}
      </button>
    </div>
  );
}
