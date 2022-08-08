import React from 'react';
import Weather from './Weather';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Weather defaultCity='Kharkiv' />
        <footer>
          <small>
            <a href='https://github.com/YuliaYurievna/react-weather-app' rel='noreferrer' target='_blank'>Open-source code</a>, by Yuliia Poddiacha
          </small>
        </footer> 
      </div>
        

    </div>
  );

}


