import { useState } from "react";
import { useSIPProvider } from "../../src";
import { RegisterStatus, CONNECT_STATUS } from "../../src/type";
import { CallSessionItem } from "./CallSessionItem";

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
    <div className="flex justify-center">
      <div className="min-w-[700px] flex flex-col gap-5">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              connectAndRegister({
                username: username,
                password: password,
              });
            }}
          >
            <div className="flex flex-col gap-5">
              <label>SIP Credential</label>
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

              {connectStatus !== CONNECT_STATUS.CONNECTED ? (
                <button
                  type="submit"
                  className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
                >
                  Connect
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    sessionManager?.disconnect();
                  }}
                  className="text-[0.8rem] bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded"
                >
                  Disconnect
                </button>
              )}
            </div>
          </form>
        </div>
        <div>
          <div className="mt-1 flex items-center gap-x-1.5">
            <div
              className={`flex-none rounded-full bg-${
                connectStatus === CONNECT_STATUS.CONNECTED
                  ? "emerald"
                  : "yellow"
              }-500/20 p-1`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  connectStatus === CONNECT_STATUS.CONNECTED
                    ? "bg-emerald-500"
                    : "bg-yellow-500"
                }`}
              ></div>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Connect Status: {connectStatus}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-x-1.5">
            <div
              className={`flex-none rounded-full bg-${
                registerStatus === RegisterStatus.REGISTERED
                  ? "emerald"
                  : "yellow"
              }-500/20 p-1`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  registerStatus === RegisterStatus.REGISTERED
                    ? "bg-emerald-500"
                    : "bg-yellow-500"
                }`}
              ></div>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              Register Status: {registerStatus}
            </p>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await sessionManager?.call(
              `sip:${callTo}@voice.chatchilladev.sip.jambonz.cloud`,
              {}
            );
          }}
        >
          <div className="flex flex-col gap-5">
            <label>Make the new call</label>
            <input
              value={callTo}
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setCallTo(e.target.value);
              }}
            />

            <button
              type="submit"
              className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              Call
            </button>
          </div>
        </form>
        <div className="flex flex-1 items-center justify-center">
          <ul role="list" className="divide-y divide-gray-100">
            {Object.keys(sessions).map((sessionId) => (
              <CallSessionItem key={sessionId} sessionId={sessionId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
