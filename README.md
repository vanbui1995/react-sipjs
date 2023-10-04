

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/vanbui1995/react-sipjs">
    <img src="https://sipjs.com/shared/img/logo.png">
  </a>

  <h3 align="center">React SIP.js Client</h3>

  <p align="center">
    React components for <a href="https://sipjs.com">SIP.js</a>.
    <br />
    <a href="https://github.com/vanbui1995/react-sipjs/tree/main/examples/full-example">View Demo</a>
    ·
    <a href="https://github.com/vanbui1995/react-sipjs/issues">Report Bug</a>
    ·
    <a href="https://github.com/vanbui1995/react-sipjs/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[Image here]

The library provide the react components, almost of components are React Hook, it provides easy way to build the sessions, perform actions on SIP calls

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation

Install via npm or yarn

`yarn add react-sipjs`
`npm install react-sipjs`


<!-- USAGE EXAMPLES -->
## Usage

1. Import and use the `SIPProvider` on our root application:
```js
import { SIPProvider } from "react-sipjs";

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
```

2. Use `useSIPProvider` at the hook to get `connectAndRegister` method to connect & register with SIP account
```js

import { useSIPProvider } from "react-sipjs";

export const CallCenter = () => {
  const [username, setUsername] = useState<string>("test8");
  const [password, setPassword] = useState<string>("test123");
  const {
    connectAndRegister,
    connectStatus,
  } = useSIPProvider();
  
  useEffect(() => {
    connectAndRegister({
      username: username,
      password: password,
    });
  }, []);

  return ...;
}
```
3. Make the first call
```js
const {
  sessionManager
  sessions
} = useSIPProvider();

await sessionManager?.call(`sip:${callTo}@voice.chatchilladev.sip.jambonz.cloud`);
```
4. Retrive reactive sessions
```js
const {
  sessions
} = useSIPProvider();

sessions.forEach(session => {
  console.log(session.id, session.state);
})
```
5. Perform action with single session with `useSessionCall`
```js
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
    <div>
      <p>{session.state}</p>
        {session.state === SessionState.Initial && (
        <>
          <button  onClick={answer}>Answer</button>
          <button  onClick={decline}>Decline</button>
        </>
      )}
      
      {SessionState.Established === session.state && (
        <>
          <button  onClick={isHeld ? unhold : hold}>
            {isHeld ? "Unhold" : "Hold"}
          </button>
          <button  onClick={isMuted ? unmute : mute}>
            {isMuted ? "Ummute" : "Mute"}
          </button>
        </>
      )}
      {![SessionState.Terminating, SessionState.Terminated].includes(
      session.state) && <button  onClick={hangup}>Hang Up</button>}
    </div>
  )
}
```

<!-- CONTRIBUTING -->
## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact
Van Bui - btvan1995@gmail.com

Project Link: [https://github.com/vanbui1995/react-sipjs](https://github.com/vanbui1995/react-sipjs)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
