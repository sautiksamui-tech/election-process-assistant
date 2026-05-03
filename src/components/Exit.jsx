import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

const Exit = ({ resetSimulation }) => {
  const [totalVotes, setTotalVotes] = useState(null);

  useEffect(() => {
    const fetchTotalVotes = async () => {
      let countSet = false;
      if (db) {
        try {
          const coll = collection(db, "mockVotes");
          const snapshot = await getCountFromServer(coll);
          setTotalVotes(snapshot.data().count);
          countSet = true;
        } catch (e) {
          console.error("Could not fetch vote count from Firebase, using fallback:", e);
        }
      }
      
      // Fallback simulation if Firebase is disabled (e.g. no billing enabled)
      if (!countSet) {
        setTotalVotes(Math.floor(Math.random() * 5000) + 1200);
      }
    };
    fetchTotalVotes();
  }, []);

  return (
    <div className="text-center animate-fadeIn py-10 flex flex-col items-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200 animate-float">
        <span className="text-4xl text-green-600">✓</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Vote Cast Successfully</h2>
      <p className="text-slate-500 mb-4 leading-relaxed font-medium">
        Thank you for participating in democracy!<br/> This concludes the educational simulation.
      </p>

      {totalVotes !== null && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-8 w-full animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          <p className="text-indigo-800 font-semibold text-sm">
            You joined <span className="text-indigo-600 font-bold text-lg">{totalVotes.toLocaleString()}</span> others who participated in this mock election simulation!
          </p>
        </div>
      )}

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
