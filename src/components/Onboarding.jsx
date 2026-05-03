import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [age, setAge] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');
  const [showRefresherPrompt, setShowRefresherPrompt] = useState(false);
  const [mappedConstituency, setMappedConstituency] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const fetchConstituency = async (pin) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn("Google Maps API Key missing. Falling back to India Central.");
      return "India Central";
    }

    try {
      setLoadingLocation(true);
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pin},+India&key=${apiKey}`);
      const data = await res.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        // Find city/state from address components
        const addressComponents = data.results[0].address_components;
        let city = '';
        let state = '';
        
        addressComponents.forEach(component => {
          if (component.types.includes('locality')) city = component.long_name;
          if (component.types.includes('administrative_area_level_1')) state = component.long_name;
        });

        return city ? `${city}, ${state}` : state || "India Central";
      } else {
        return "India Central";
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
      return "India Central";
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numAge = parseInt(age, 10);
    if (isNaN(numAge) || numAge <= 0) {
      setError('Please enter a valid age.');
      return;
    }

    if (!pinCode || pinCode.length !== 6) {
      setError('Please enter a valid 6-digit Indian Pin Code.');
      return;
    }

    const constituency = await fetchConstituency(pinCode);
    setMappedConstituency(constituency);

    if (numAge < 18) {
      alert(`You are not eligible to vote yet, but you can try the simulation!\n\nYour mapped constituency is ${constituency}.`);
      onComplete(numAge, constituency, 'tutorial');
    } else if (numAge === 18 || numAge === 19) {
      alert(`Congratulations on being a first-time voter! 🎉\n\nYour mapped constituency is ${constituency}. Let's go through the tutorial.`);
      onComplete(numAge, constituency, 'tutorial');
    } else {
      setShowRefresherPrompt(true);
    }
  };

  if (showRefresherPrompt) {
    return (
      <div className="text-center animate-fadeIn flex flex-col items-center py-6">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm animate-float">
          👋
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome!</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your constituency is <strong className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{mappedConstituency}</strong>. <br/>
          Do you want a quick refresher on the polling booth process?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button 
            onClick={() => onComplete(parseInt(age, 10), mappedConstituency, 'tutorial')}
            className="btn-primary flex-1"
          >
            Yes, show tutorial
          </button>
          <button 
            onClick={() => onComplete(parseInt(age, 10), mappedConstituency, 'ballot')}
            className="btn-secondary flex-1"
          >
            No, go to ballot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="bg-amber-50/80 border border-amber-200/60 p-4 mb-8 rounded-2xl flex items-start gap-3">
        <span className="text-amber-500 mt-0.5 text-lg">💡</span>
        <p className="text-sm text-amber-800 leading-relaxed font-medium">
          Enter your details below to simulate the voting experience mapped to your local constituency anywhere in India.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Your Age</label>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="glass-input"
            placeholder="e.g. 25"
            required
            disabled={loadingLocation}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Indian Pin Code</label>
          <input 
            type="text" 
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0,6))}
            className="glass-input"
            placeholder="e.g. 400001"
            maxLength={6}
            required
            disabled={loadingLocation}
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100 animate-fadeIn">
            {error}
          </div>
        )}

        <div className="pt-4">
          <button type="submit" className="btn-primary flex justify-center items-center h-12" disabled={loadingLocation}>
            {loadingLocation ? (
              <span className="animate-pulse">Locating...</span>
            ) : (
              "Start Simulation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
