import { SessionState } from "sip.js";
import { useSessionCall } from "../../src";
import { SessionDirection } from "../../src/type";
import { CallTimer } from "./CallTimer";

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
    timer,
  } = useSessionCall(sessionId);

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="h-12 w-12 flex-none rounded-full bg-gray-400"></div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Session ID: {session.id}
          </p>
          <div className="flex gap-2">
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {session.state}
            </p>

            {session.state === SessionState.Initial && (
              <>
                <button onClick={answer} className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[0.1rem] px-[0.3rem] border border-blue-500 hover:border-transparent rounded">Answer</button>
                <button onClick={decline} className="text-[0.8rem] bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-[0.1rem] px-[0.3rem] border border-red-500 hover:border-transparent rounded">Decline</button>
              </>
            )}

            {SessionState.Established === session.state && (
              <>
                <button
                  onClick={isHeld ? unhold : hold}
                  className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[0.1rem] px-[0.3rem] border border-blue-500 hover:border-transparent rounded"
                >
                  {isHeld ? "Unhold" : "Hold"}
                </button>
                <button
                  onClick={isMuted ? unmute : mute}
                  className="text-[0.8rem] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[0.1rem] px-[0.3rem] border border-blue-500 hover:border-transparent rounded"
                >
                  {isMuted ? "Ummute" : "Mute"}
                </button>
              </>
            )}

            {![SessionState.Terminating, SessionState.Terminated].includes(
              session.state
            ) && (
              <button
                onClick={hangup}
                className="text-[0.8rem] bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-[0.1rem] px-[0.3rem] border border-red-500 hover:border-transparent rounded"
              >
                Hang Up
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">
          Duration:{" "}
          {timer?.answeredAt && (
            <CallTimer
              isEnd={session.state === SessionState.Terminated}
              startAt={timer.answeredAt}
            />
          )}
        </p>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <p className="text-xs leading-5 text-gray-500">
            {direction === SessionDirection.INCOMING
              ? "Incoming Call"
              : "Outgoing Call"}
          </p>
        </div>
      </div>
    </li>
  );
};
