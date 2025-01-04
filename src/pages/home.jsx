import React from 'react';
import Hero from '../components/homepage/hero';
import Section from '../components/homepage/section';



const Home = () => {
  return (
    <>
      <Hero />
      {/* There is a conditional on title in section.jsx, update that if changing title*/}
      <Section title='Apply' />
      <Section title='News' />
    </>
  )
}

export default Home