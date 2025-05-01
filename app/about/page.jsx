// pages/about.js
import React from 'react';

const About = () => {
  return (
    <section className="bg-cover bg-center relative py-20 mt-10 my-3" >
      <div className="container mx-auto px-4 text-left bg-white bg-opacity-80">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 font-sans1">About Us</h1>
        <h2 className="text-xl font-semibold mb-6 text-gray-800 font-sans1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-sans1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        {/* <a href="/contact" className="inline-block bg-gray-900 text-white py-2 px-3 hover:bg-gray-700 transition duration-300 text-sm font-sans1">Get in Touch</a> */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 border-t border-gray-100"></div>
    </section>
  );
};

export default About;
