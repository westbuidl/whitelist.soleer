import React, { useState, useEffect } from 'react';

interface ComingSoonModalProps {
  isOpen: boolean;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set a specific target date (e.g., January 1, 2025 at 00:00:00)
    const targetDate = new Date('2024-12-25T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the countdown is over, you can handle it here
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
      <div className="bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-lg px-4 py-3 border border-purple-500/20">
        <span className="text-white text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-white/80 text-xs mt-1 block">{label}</span>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred background overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      
      {/* Modal content */}
      <div className="relative z-10 text-center animate-text-slide-up w-full max-w-3xl px-4">
        <div className="relative">
          <h2 className="text-6xl font-bold text-white mb-4 animate-pulse">
            <span className="relative">
              <span className="absolute inset-0 blur-md text-purple-500 animate-pulse">
                COMING SOON
              </span>
              <span className="relative text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">
                COMING SOON
              </span>
            </span>
          </h2>
        </div>
        
        <p className="text-gray-300 text-xl mt-4">
          The Soleer marketplace is under development.
          <br />
          Stay tuned for the launch!
        </p>

        {/* Verification Banner */}
        <div className="mt-8">
          <div className="animate-gradient-x bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)] animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              
              {/* Content */}
              <div className="relative px-6 py-8">
                <div className="container mx-auto flex flex-col items-center justify-between space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 rounded-full p-3 backdrop-blur-sm border border-white/20 animate-bounce">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-2xl mb-1">
                        Account Verification Snapshot
                      </h3>
                      <p className="text-white/80 text-base">
                        Verify your account to unlock exclusive features
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-4">
                      {Object.entries(timeLeft).map(([key, value]) => (
                        <TimeUnit key={key} value={value} label={key.charAt(0).toUpperCase() + key.slice(1)} />
                      ))}
                    </div>

                    <button
                      onClick={() => window.location.href = '/profile'}
                      className="bg-white px-8 py-3 rounded-xl font-semibold text-purple-600 hover:bg-white/90 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Verify Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Redirect "Got it" button to main page */}
        <button
          onClick={() => window.location.href = 'https://soleer.xyz'} 
          className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;