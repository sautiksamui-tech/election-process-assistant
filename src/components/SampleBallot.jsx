import React, { useState, useEffect } from 'react';
import { generateCandidates } from '../utils/candidateGenerator';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SampleBallot = ({ constituency, navigateTo }) => {
  const [voting, setVoting] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const generated = await generateCandidates(constituency);
      setCandidates(generated);
      setLoading(false);
    };
    fetchCandidates();
  }, [constituency]);

  const handleVote = async (candidate) => {
    setVoting(true);
    setVotedCandidate(candidate);

    // Write to Firestore if db is initialized (without awaiting so it doesn't block the UI)
    if (db) {
      addDoc(collection(db, "mockVotes"), {
        constituency,
        votedFor: candidate.name === 'NOTA' ? 'NOTA' : 'Generic Candidate', // keep strictly anonymous/generic
        timestamp: serverTimestamp()
      }).catch(e => console.error("Error writing to Firestore:", e));
    }
    
    setTimeout(() => {
      navigateTo('exit');
    }, 7000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Generating dynamic ballot for {constituency}...</p>
      </div>
    );
  }

  if (voting) {
    return (
      <div className="text-center animate-fadeIn py-8 flex flex-col items-center">
        <div className="text-6xl mb-6 animate-pulse">🖨️</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Long Beep...</h2>
        <p className="text-slate-500 mb-8 font-medium">Please verify your VVPAT slip.</p>
        
        {/* VVPAT Window Simulation */}
        <div className="bg-slate-50 border-4 border-slate-300 w-56 p-4 flex flex-col items-center justify-center shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)] rounded-lg h-72 relative overflow-hidden">
           {/* Glass reflection effect */}
           <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none"></div>
           
           <div className="animate-slideDown absolute top-4 flex flex-col items-center bg-white p-6 shadow-sm border border-gray-100 w-3/4 rounded z-0">
              <span className="text-5xl mb-4">{votedCandidate.symbol}</span>
              <span className="font-bold text-slate-800 text-center uppercase tracking-wide text-sm">{votedCandidate.name}</span>
           </div>
        </div>
        <p className="text-xs font-semibold text-slate-400 mt-6 uppercase tracking-wider">The slip drops after 7 seconds</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 text-center border-b border-gray-100 pb-4">
        <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Constituency</span>
        <h2 className="text-xl font-bold text-slate-800">{constituency}</h2>
      </div>

      <div className="bg-slate-200/80 p-3 rounded-2xl border-4 border-slate-300 max-w-sm mx-auto shadow-inner">
        <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
          {candidates.map((candidate, index) => (
            <div key={index} className="flex items-center justify-between border-b border-slate-100 last:border-0 p-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1 text-left pr-4">
                <p className="font-bold text-sm uppercase text-slate-800">{candidate.name}</p>
                <p className="text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5">{candidate.party}</p>
              </div>
              <div className="flex items-center space-x-5">
                <div className="text-3xl bg-slate-50 border border-slate-200 w-14 h-14 flex items-center justify-center rounded-lg shadow-sm">
                  {candidate.symbol}
                </div>
                <button 
                  onClick={() => handleVote(candidate)}
                  className="evm-button relative"
                  aria-label={`Vote for ${candidate.name}`}
                >
                  <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 opacity-50"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleBallot;
