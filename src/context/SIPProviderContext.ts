import { createContext, useContext, useEffect, useState } from "react";

import {
  IProviderContext,
  RegisterStatus,
  CONNECT_STATUS,
  SessionDirection,
} from "../type";
import { Inviter } from "sip.js";

export const ProviderContext = createContext<IProviderContext>({
  sessionManager: null,
  connectAndRegister: () => {},
  connectStatus: CONNECT_STATUS.WAIT_REQUEST_CONNECT,
  registerStatus: RegisterStatus.UNREGISTERED,
  sessions: {},
});

export const useSIPProvider = () => {
  return useContext(ProviderContext);
};

export const useSessionCall = (sessionId: string) => {
  const { sessions, sessionManager } = useSIPProvider();
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
      
  return {
    direction,
    session: session,
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
