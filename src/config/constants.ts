export const QUERY_STALE_TIME = 1000 * 60 * 5;

export const JITSI = {
  TOOLBAR_BUTTONS: [
    "microphone",
    "camera",
    "desktop",
    "chat",
    "raisehand",
    "tileview",
    "hangup",
  ],
  DEFAULT_ROOM_PREFIX: "supervision-session",
  IFRAME_CONTAINER_ID: "jitsi-container",
} as const;

export const UI = {
  APP_NAME: "Supervisión App",
  HOME_TITLE: "Supervisión Remota de Exámenes",
  HOME_SUBTITLE: "Crea una sesión para iniciar la videollamada de supervisión",
  CREATE_SESSION_BUTTON: "Crear nueva sesión",
  SESSION_TITLE: "Sesión en curso",
  LEAVE_BUTTON: "Salir de la sesión",
  LOADING_JITSI: "Conectando a la videollamada...",
} as const;
