import React, { useEffect, useState } from 'react';
import Hero from '../components/homepage/hero';
import Section from '../components/homepage/section';
import SuccessMessage from '../components/success';
import { useLocation, useNavigate } from 'react-router-dom';
import { news } from '../data/news';
import { advertisements } from '../data/ads';

async function fetchAllAds() {
  try {
    const response = await fetch("http://localhost:5000/getAllAds");
    const data = await response.json();
    return data.allAds;
  } catch (err) {
    console.log("FRONTEND : Error while fetching ads", err);
    return false;
  }
}

const Home = () => {
  const [ads, setAds] = useState(advertisements);
  const [success, setSuccess] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setSuccess(location.state);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchAds = async () => {
      console.log("Fetching Advertisements");
      const allAds = await fetchAllAds();
      setAds(allAds);
      console.log(allAds);
    };
    fetchAds();
  }, []);

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
