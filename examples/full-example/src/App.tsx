import { SIPProvider } from "../../../src/sip-provider";
import { CallCenter } from "./CallCenter";

function App() {
  return (
    <div className="p-5">
      <SIPProvider
        options={{
          domain: "voice.chatchilladev.sip.jambonz.cloud",
          webSocketServer: "wss://sip.jambonz.cloud:8443",
        }}
      >
        <div>
          <CallCenter />
        </div>
      </SIPProvider>
    </div>
  );
}

export default App;
