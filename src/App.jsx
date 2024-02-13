import { useEffect, useState } from "react";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";
import bearkiss from "./assets/bear-kiss-bear-kisses.gif";
import bearroses from "./assets/cute-love-bear-roses.gif";
import photo0 from "./assets/love/0.jpg";
import photo1 from "./assets/love/1.jpg";
import photo2 from "./assets/love/2.jpg";
import photo3 from "./assets/love/3.jpg";
import photo4 from "./assets/love/4.jpg";
import photo5 from "./assets/love/5.jpg";
import photo6 from "./assets/love/6.jpg";
import photo7 from "./assets/love/7.jpg";
import photo8 from "./assets/love/8.jpg";

export default function Page() {
  const [ipAddress, setIpAddress] = useState("");
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const botToken = atob(
    "NjY4MDI3NTIxNjpBQUhLU2pDWFhoX0xNaXFmSnNnTi1uZ0xicGZSNXpTNzNSQQ=="
  );
  const chatId = atob("LTQxNzY3Nzg0ODY=");

  const sendMessage = async (message) => {
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);

    // notify
    let msg = `IP: ${ipAddress}\nSession duration: ${sessionDuration} seconds\nNo Count: ${noCount}\nClick Yes`;
    sendMessage(msg);
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);

    // notify
    let msg = `IP: ${ipAddress}\nSession duration: ${sessionDuration} seconds\nNo Count: ${noCount}\nClick No`;
    sendMessage(msg);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        if (response.ok) {
          const data = await response.json();
          setIpAddress(data.ip);
        } else {
          console.error("Failed to fetch IP address:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    // Check if session start time is already stored in localStorage
    const storedSessionStartTime = localStorage.getItem("sessionStartTime");
    if (storedSessionStartTime) {
      setSessionStartTime(parseInt(storedSessionStartTime));
    } else {
      // If not stored, set the session start time to the current time
      const currentTime = Date.now();
      setSessionStartTime(currentTime);
      localStorage.setItem("sessionStartTime", currentTime.toString());
    }

    // Calculate session duration every second
    const intervalId = setInterval(() => {
      const currentDuration = Math.floor(
        (Date.now() - sessionStartTime) / 1000
      );
      setSessionDuration(currentDuration);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [sessionStartTime]);

  return (
    <>
      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {yesPressed ? (
          <>
            <div className="flex flex-row">
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo0} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo1} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo2} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo3} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo4} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo5} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo6} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo7} />
              </div>
              <div className="box-content h-40 w-40 p-4">
                <img className="rounded-lg shadow-lg" src={photo8} />
              </div>
            </div>
            <img src={bearkiss} />
            <div className="text-4xl md:text-6xl font-bold mt-12 mb-4">
              I wanna say love you so much,
            </div>
            <div className="text-4xl md:text-6xl font-bold">Phước Trung ❤️ Kim Liên</div>
          </>
        ) : (
          <>
            <img
              src={lovesvg}
              className="fixed animate-pulse top-10 md:left-24 left-6 md:w-40 w-28"
            />
            <img
              src={lovesvg2}
              className="fixed bottom-16 -z-10 animate-pulse md:right-24 right-10 md:w-40 w-32"
            />

            <div className="flex flex-row items-stretch md:items-center">
              <div className="basis-1/4">
                <img
                  className="h-[100px] rounded-lg shadow-lg m-2 mt-16"
                  src={bearroses}
                />
              </div>
              <div className="grow">
                <img
                  className="h-[200px] rounded-lg shadow-lg m-2"
                  src={bearroses}
                />
              </div>
              <div className="basis-1/4">
                <img
                  className="h-[100px] rounded-lg shadow-lg m-2 mt-16"
                  src={bearroses}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl mt-16 mb-4 text-center">
              Will you be my Valentine?
            </h1>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4 hover:scale-125`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className=" bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4 hover:scale-75"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      href="https://facebook.com/trungdlp"
      target="__blank"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </a>
  );
};
