import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Tutorial from './components/Tutorial';
import SampleBallot from './components/SampleBallot';
import Exit from './components/Exit';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // onboarding, tutorial, ballot, exit
  const [userAge, setUserAge] = useState(null);
  const [constituency, setConstituency] = useState('');

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = (age, constituencyName, nextScreen) => {
    setUserAge(age);
    setConstituency(constituencyName);
    setCurrentScreen(nextScreen);
  };

  const resetSimulation = () => {
    setUserAge(null);
    setConstituency('');
    setCurrentScreen('onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      
      {/* Decorative background blur blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulseGlow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulseGlow" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-lg glass-panel relative z-10 flex flex-col">
        <header className="p-6 pb-2 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/30 mb-4 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            Election Process Assistant
          </h1>
        </header>
        
        <div className="p-6 pt-4 flex-grow">
          {currentScreen === 'onboarding' && (
            <Onboarding onComplete={handleOnboardingComplete} />
          )}
          {currentScreen === 'tutorial' && (
            <Tutorial 
              userAge={userAge} 
              navigateTo={navigateTo} 
            />
          )}
          {currentScreen === 'ballot' && (
            <SampleBallot 
              constituency={constituency} 
              navigateTo={navigateTo} 
            />
          )}
          {currentScreen === 'exit' && (
            <Exit 
              resetSimulation={resetSimulation} 
            />
          )}
        </div>

        <footer className="p-4 border-t border-gray-100/50 text-center">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Educational Simulation Only • Not Affiliated with Election Commission
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
