import { useState } from "react";
import Loader from "./Loader";
const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="container mx-auto">
      <Header />
      <Search setResult={setResult} setLoading={setLoading} />
      <Result result={result} loading={loading} />
      {/* <Footer result={result} /> */}
      <Copyright />
    </div>
  );
}

export default App;

function Header() {
  return (
    <div className="mx-4 md:mx-40 flex items-center justify-between">
      <div>
        <img src="./assets/icons8-book-64.png" alt="logo" />
      </div>
      <div></div>
    </div>
  );
}
function Search({ setResult, setLoading }) {
  const [search, setSearch] = useState("");
  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + search);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
  }
  return (
    <div className="mx-4 md:mx-40 py-8">
      <form className="relative" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          name=""
          id=""
          className="bg-[#F4F4F4] w-full rounded-xl px-2 md:px-3 py-3 md:py-5 outline-none "
          placeholder="Type a word"
        />
        <button type="submit">
          <img
            className="absolute top-0 right-0 m-2 h-8 md:h-12"
            src="./assets/search.png"
            alt="search"
          />
        </button>
      </form>
    </div>
  );
}

function Result({ result, loading }) {
  function playAudio() {
    var audio = document.getElementById("myAudio");
    if (audio) {
      audio.play().catch((error) => {
        console.error(error);
      });
    } else {
      console.error("Audio element not found");
    }
  }
  if (loading) {
    return <Loader />;
  } else if (result) {
    if (result.title === "No Definitions Found") {
      return (
        <p className="mx-4 md:mx-40 text-center py-8">
          🥺Sorry, we couldn't find the word you were looking for.
        </p>
      );
    } else {
      const data = result[0];
      return (
        <main>
          <div className="mx-4 md:mx-40 ">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{data.word}</h1>
                <p className="text-indigo-500">{data.phonetic}</p>
              </div>
              {data.phonetics[0].audio && (
                <div>
                  <audio id="myAudio" src={data.phonetics[0].audio}></audio>
                  <button onClick={playAudio}>
                    <img
                      src="./assets/play.png"
                      alt="speaker"
                      className="h-12"
                    />
                  </button>
                </div>
              )}
            </div>
            <div className="noun">
              <div className="py-6 flex">
                <p className="font-bold">{data.meanings[0].partOfSpeech}</p>
              </div>
              <div>
                <p className="text-lg text-gray-400">Meaning</p>
                <div>
                  <ul>
                    {data.meanings[0].definitions
                      .slice(0, 4)
                      .map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-3 py-3"
                        >
                          <p className="text-indigo-500">&#x2022;</p>
                          <p className="">{item.definition}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }
  }
}
// function Footer({ result }) {
//   if (result && result[0].word) {
//     return (
//       <div className="mx-4 md:mx-40 py-6">
//         <hr />
//         <p className="text-center">
//           <span className="text-sm">Source: </span>
//           <a href={result[0].sourceUrls[0]} className="text-xs underline">
//             {result[0].sourceUrls[0]}
//           </a>
//         </p>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }
function Copyright() {
  return (
    <small className="fixed m-1 bottom-0 right-5 text-[5px]">
      Copyright &copy; pokhrelgopal
    </small>
  );
}
