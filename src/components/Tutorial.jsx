import React, { useState } from 'react';

const steps = [
  {
    title: "Step 1: Entry",
    description: "Phones are banned inside the booth. Keep your Voter ID (EPIC) ready.",
    icon: "🚫📱"
  },
  {
    title: "Step 2: Verification",
    description: "Polling Officer 1 checks your name in the roll. Officer 2 marks your finger with indelible ink. Officer 3 unlocks the EVM for you.",
    icon: "📋✍️"
  },
  {
    title: "Step 3: Voting",
    description: "Inside the voting compartment, press the blue button on the EVM next to the symbol of your chosen candidate.",
    icon: "👆🔵"
  },
  {
    title: "Step 4: Verification (VVPAT)",
    description: "Listen for a long beep. Look at the VVPAT window; a slip with your candidate's symbol will be visible for 7 seconds before dropping into the box.",
    icon: "🖨️👀"
  }
];

const Tutorial = ({ userAge, navigateTo }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigateTo('ballot');
    }
  };

  return (
    <div className="animate-fadeIn h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Polling Booth Process</h2>
        <p className="text-sm text-slate-500 mt-1">Let's walk through what happens inside.</p>
      </div>
      
      <div className="bg-gradient-to-b from-blue-50/50 to-indigo-50/50 border border-blue-100/50 p-8 rounded-2xl mb-8 flex flex-col items-center text-center flex-grow justify-center shadow-inner relative overflow-hidden">
        {/* Subtle decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-2xl opacity-50 pointer-events-none"></div>
        
        <div className="text-5xl mb-6 relative z-10 animate-float drop-shadow-md">
          {steps[currentStep].icon}
        </div>
        <h3 className="text-lg font-bold text-indigo-900 mb-3 relative z-10">
          {steps[currentStep].title}
        </h3>
        <p className="text-indigo-800 text-sm leading-relaxed max-w-xs relative z-10 font-medium">
          {steps[currentStep].description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-auto">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`h-2.5 rounded-full transition-all duration-500 ${index === currentStep ? 'bg-indigo-500 w-8 shadow-sm shadow-indigo-500/30' : 'bg-gray-200 w-2.5'}`}
            />
          ))}
        </div>
        <button 
          onClick={nextStep}
          className="btn-primary sm:w-auto px-8"
        >
          {currentStep === steps.length - 1 ? 'Proceed to Vote' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
