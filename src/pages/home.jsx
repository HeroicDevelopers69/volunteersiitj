import React, { useEffect, useState } from 'react';
import Hero from '../components/homepage/hero';
import Section from '../components/homepage/section';


async function fetchAllAds() {
  try {
    const response = await fetch("http://localhost:5000/getAllAds");
    const data = await response.json();
    return data.allAds
  }
  catch(err){
    console.log("FRONTEND : Error while fetching ads",err);
    return false;
  }
}

async function fetchAllNews() {
  try{
    const response = await fetch("http://localhost:5000/getAllNews");
    const data = await response.json();
    return data.allNews
  }
  catch(err){
    console.log("FRONTEND : Error while fetching news",err);
    return false;
  }
}

const Home = () => {
  const [ads,setAds] = useState([]);
  const [news,setNews] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      console.log("Fetching Advertisements");
      const allads = await fetchAllAds();
      setAds(allads);
      console.log("Fetched ads",allads)
    };
    fetchAds();

    const fetchNews = async () => {
      console.log("Fetching News");
      const allnews = await fetchAllNews();
      setNews(allnews);
      console.log("Fetched news",allnews)
    };
    fetchNews();
  }, []); // Dependency array to run effect only once

  return (
    <>
      <Hero />
      <Section title='Apply' data={ads} />
      <Section title='News' data={news} />
      {success && (
        <SuccessMessage title={success.title} message={success.message} state="true" />
      )}
    </>
  );
};

export default Home;
