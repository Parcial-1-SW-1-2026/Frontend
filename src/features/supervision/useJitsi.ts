import { useEffect, useRef, useState } from "react";
import env from "@/config/env";
import { JITSI } from "@/config/constants";
import type { JitsiConfig } from "./types";

type JitsiApi = {
  dispose: () => void;
  addEventListener?: (event: string, callback: () => void) => void;
};

export default function useJitsi({ roomName, displayName, containerRef }: JitsiConfig) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const apiRef = useRef<JitsiApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadJitsi = () => {
      const options = {
        roomName: `${JITSI.DEFAULT_ROOM_PREFIX}-${roomName}`,
        parentNode: containerRef.current,
        width: "100%",
        height: "100%",
        userInfo: { displayName: displayName ?? "Participante" },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [...JITSI.TOOLBAR_BUTTONS],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
      };

      try {
        // @ts-expect-error — JitsiMeetExternalAPI se carga vía script global
        const api = new window.JitsiMeetExternalAPI(env.JITSI_DOMAIN, options) as JitsiApi;
        apiRef.current = api;
        setIsLoading(false);
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };

    if (window.JitsiMeetExternalAPI) {
      loadJitsi();
    } else {
      const script = document.createElement("script");
      script.src = `https://${env.JITSI_DOMAIN}/external_api.js`;
      script.async = true;
      script.onload = loadJitsi;
      script.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      document.head.appendChild(script);
    }

    return () => {
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, [roomName, displayName, containerRef]);

  return { isLoading, hasError };
}
