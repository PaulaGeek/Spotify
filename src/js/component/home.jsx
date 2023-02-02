import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
  //declaramos estado del contador
  const [canciones, setCanciones] = useState([]);
  const songURL = "https://assets.breatheco.de/apis/sound/songs";
  const reproducir = useRef(null);
  const [playing, setPlaying] = useState(false);
  let [numero, setnumero] = useState(0);
  const [indexSong, setindexSong] = useState(null);

  function agregarCancion(url, index) {
    reproducir.current.src = "https://assets.breatheco.de/apis/sound/" + url;
    reproducir.current.play();
    //   console.log(reproducir.current);
    //   console.log(canciones);
    //  console.log(canciones[1].url)
    //  console.log(url)
    setindexSong(index);
  }

  let arrurl = [];
  arrurl = canciones.map((item, index) => item.url);
  // console.log(arrurl);

  useEffect(() => {
    //codigo a ejecutar
    // console.log("La pagina se ha cargado exitosamente");
    fetch(songURL) //1.ir a buscar info en la url
      .then((response) => response.json()) //2.Convierte la respuesta en un json
      .then((data) => setCanciones(data)); //3. GUarda el json en un objeto data sin results porque el api que nos dieron ya venia directp
  }, []); //cuando el array está vacio el va a cargar el codigo a ejecutar UNA vez cargada la pagina

  const play = (index) => {
    setnumero(index);
    setPlaying(true);
    reproducir.current.play();
  };

  const pause = () => {
    setPlaying(false);
    reproducir.current.pause();
  };

  function playBack() {
    setnumero(numero-1);
  reproducir.current.src = `https://assets.breatheco.de/apis/sound/${canciones[numero].url}`;
  reproducir.current.play();
  }

  function playNext() {
    setnumero(numero++);
    reproducir.current.src = `https://assets.breatheco.de/apis/sound/${canciones[numero].url}`;
    reproducir.current.play();
  }

  return (
    <>
              <div className="bg-dark">
          <div className="container w-50 bg-secondary">
          <nav class="navbar bg-dark">
  <div class="container-fluid">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Logo" height="24" class="d-inline-block align-text-top"/>
  </div>
</nav>
      <ol className="list-group list-group-numbered ">
        {canciones.map((item, index) => (
          <button
            onClick={() => agregarCancion(item.url, index)}
            className="rounded border-dark bg-dark my-2"
          >
            <li
              className="list-group-item bg-dark text-white"
              aria-current="true"
              key={item.id}
            >
              {item.name}
            </li>
          </button>
        ))}
      </ol>
      <div className="sticky-bottom bg-dark">
        <audio ref={reproducir} className="">
          {" "}
        </audio>
        <div className="d-flex justify-content-center">
          <div>
          <button onClick={playBack} type="button" className="btn btn-light me-3"><i className="fa fa-backward"></i> </button>
          </div>
          <div >
            <button
              onClick={playing ? pause : play}
              type="button"
              className="btn btn-light w-100"
            ><i class="fa fa-play" aria-hidden="true"></i>
              {" "}
              {playing ? play : pause}{" "}
            </button>
          </div>
          <button onClick={playNext} type="button" className="btn btn-light ms-3"><i className="fa fa-forward"></i></button>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;
