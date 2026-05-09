export type SupervisionEventType = "tab_switch" | "copy_paste" | "camera_off" | "mic_off";

export type SupervisionEvent = {
  id: string;
  sessionId: string;
  type: SupervisionEventType;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

export type RecordingStatus = "idle" | "recording" | "stopped" | "uploading" | "uploaded";

export type JitsiConfig = {
  roomName: string;
  displayName?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
};
