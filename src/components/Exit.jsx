import React from 'react';

const Exit = ({ resetSimulation }) => {
  return (
    <div className="text-center animate-fadeIn py-10 flex flex-col items-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200 animate-float">
        <span className="text-4xl text-green-600">✓</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Vote Cast Successfully</h2>
      <p className="text-slate-500 mb-10 leading-relaxed font-medium">
        Thank you for participating in democracy!<br/> This concludes the educational simulation.
      </p>
      <button 
        onClick={resetSimulation}
        className="btn-secondary px-8 w-full sm:w-auto"
      >
        Restart Simulation
      </button>
    </div>
  );
};

export default Exit;
