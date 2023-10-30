import { createContext, useContext, useState } from "react";

import {
  IProviderContext,
  RegisterStatus,
  CONNECT_STATUS,
  SessionDirection,
  Timer,
} from "../type";
import { Inviter } from "sip.js";

export const ProviderContext = createContext<IProviderContext>({
  sessionManager: null,
  connectAndRegister: () => {},
  connectStatus: CONNECT_STATUS.WAIT_REQUEST_CONNECT,
  registerStatus: RegisterStatus.UNREGISTERED,
  sessions: {},
  sessionTimer: {},
});

export const useSIPProvider = () => {
  return useContext(ProviderContext);
};

export const useSessionCall = (sessionId: string) => {
  if (!sessionId) return null;
  const { sessions, sessionManager, sessionTimer } = useSIPProvider();
  const session = sessions[sessionId];

  const [isMuted, setIsMuted] = useState<boolean>(
    sessionManager?.isMuted(session) || false
  );
  const [isHeld, setIsHeld] = useState<boolean>(
    sessionManager?.isHeld(session) || false
  );

  const direction =
    session instanceof Inviter
      ? SessionDirection.OUTGOING
      : SessionDirection.INCOMING;

  const timer: Timer | undefined = sessionTimer[sessionId];

  return {
    direction,
    session: session,
    timer,
    hold: () => {
      sessionManager?.hold(session);
      setIsHeld(true);
    },
    unhold: () => {
      sessionManager?.unhold(session);
      setIsHeld(false);
    },
    isHeld: isHeld,

    mute: () => {
      sessionManager?.mute(session);
      setIsMuted(true);
    },
    unmute: () => {
      sessionManager?.unmute(session);
      setIsMuted(false);
    },
    isMuted: isMuted,
    answer: () => sessionManager?.answer(session),
    decline: () => sessionManager?.decline(session),
    hangup: () => sessionManager?.hangup(session),
  };
};
