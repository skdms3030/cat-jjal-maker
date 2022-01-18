import logo from './logo.svg';
import React from "react";
import './App.css';

import Title from "./components/Title";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";

//localStorage을 json으로
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

//open api에서 이미지 url만 가져오기
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


//최상위 컴포넌트
const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  const [counter, setCounter] = React.useState(() => {
    console.log(jsonLocalStorage.getItem('counter'))
    return jsonLocalStorage.getItem('counter');
  });
  const [mainCat, setMainCat] = React.useState(CAT1)
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  });

  const alreadyFavorites = favorites.includes(mainCat)

  async function setInitialCat() {
    const newCat = await fetchCat('First cat');
    setMainCat(newCat);
  }

  //setInitialCat을 무한호출되지 않고 딱 한번 호출되게 만들어줌
  React.useEffect(() => {
    setInitialCat();
  }, [])



  async function updateMainCat(value) {
    //await를 받아오기 위해선 함수에 async가 있어야함
    const newCat = await fetchCat(value)

    //setCounter(nextCounter)
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter)
      console.log(nextCounter)
      return nextCounter;
    })

    setMainCat(newCat)

  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites)
  }

  const counterTitle = counter === null ? '' : counter + '번째 '

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorites={alreadyFavorites} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
