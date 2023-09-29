import React, { useState } from "react";
import {
  useSIPProvider,
  useSessionCall,
} from "../../src/context/SIPProviderContext";
import {
  RegisterStatus,
  CONNECT_STATUS,
  SessionDirection,
} from "../../src/type";
import { SessionState } from "sip.js";

export const CallSessionItem = (props: { sessionId: string }) => {
  const { sessionId } = props;
  const {
    isHeld,
    isMuted,
    decline,
    hangup,
    hold,
    mute,
    answer,
    session,
    unhold,
    unmute,
    direction,
  } = useSessionCall(sessionId);

  return (
    <div>
      <div>
        <div>
          Session ID: <b>{session.id}</b>
        </div>
        <div>
          Direction:{" "}
          {direction === SessionDirection.INCOMING
            ? "Incoming Call"
            : "Outgoing Call"}
        </div>
        <div>Status: {session.state}</div>
      </div>
      {session.state === SessionState.Initial && (
        <>
          <button onClick={answer}>Answer</button>
          <button onClick={decline}>Decline</button>
        </>
      )}
      <>
        {SessionState.Established === session.state && (
          <>
            <button onClick={isHeld ? unhold : hold}>
              {isHeld ? "Unhold" : "Hold"}
            </button>
            <button onClick={isMuted ? unmute : mute}>
              {isMuted ? "Ummute" : "Mute"}
            </button>
          </>
        )}
      </>
      {![SessionState.Terminated, SessionState.Terminating].includes(
        session.state
      ) && <button onClick={hangup}>Hangup</button>}
    </div>
  );
};

export const CallCenter = () => {
  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();
  const [username, setUsername] = useState<string>("test8");
  const [password, setPassword] = useState<string>("test123");

  const [callTo, setCallTo] = useState<string>("7147520454");

  return (
    <div>
      <div>
        <label>SIP Account</label>
        <div>
          <input
            value={username}
            type="text"
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
          />
          <input
            value={password}
            type="password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          {connectStatus !== CONNECT_STATUS.CONNECTED ? (
            <button
              className="btn btn-blue"
              onClick={() => {
                connectAndRegister({
                  username: username,
                  password: password,
                });
              }}
            >
              Connect
            </button>
          ) : (
            <button
              onClick={() => {
                sessionManager?.disconnect();
              }}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
      <div>Connect Status {connectStatus}</div>
      <div>Registered Status {registerStatus}</div>
      Call to{" "}
      <input
        value={callTo}
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setCallTo(e.target.value);
        }}
      />
      <button
        disabled={
          connectStatus !== connectStatus ||
          registerStatus !== RegisterStatus.REGISTERED
        }
        onClick={async () => {
          await sessionManager?.call(
            `sip:${callTo}@voice.chatchilladev.sip.jambonz.cloud`,
            {}
          );
        }}
      >
        Call
      </button>
      {Object.keys(sessions).map((sessionId) => (
        <CallSessionItem key={sessionId} sessionId={sessionId} />
      ))}
    </div>
  );
};
