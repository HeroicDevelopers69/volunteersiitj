import React, {useEffect,useState} from 'react';
import Hero from '../components/homepage/hero';
import Section from '../components/homepage/section';

import { news } from '../data/news';
import { advertisements } from '../data/ads';

async function fetchAllAds() {
  try{
    const response = await fetch("http://localhost:5000/getAllAds");
    const data = await response.json();
    return data.allAds
  }
  catch(err){
    console.log("FRONTEND : Error while fetching ads",err);
    return false;
  }
}

const Home = () => {
  const [ads,setAds] = useState(advertisements);

  useEffect(() => {
    // Fetch ads when the component mounts
    const fetchAds = async () => {
      console.log("Fetching Advertisements");
      const allads = await fetchAllAds();
      setAds(allads);
      console.log(allads)
    };
    fetchAds();
  }, []); // Dependency array to run effect only once

  return (
    <>
      <Hero />
      {/* There is a conditional on title in section.jsx, update that if changing title*/}
      <Section title='Apply' data={ads} />
      <Section title='News' data={news} />
    </>
  )
}

export default Home