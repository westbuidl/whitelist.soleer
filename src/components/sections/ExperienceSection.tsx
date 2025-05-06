"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const features = [
  { title: "Dynamic Dashboard", description: "Your personalized hub showcasing AI-recommended gigs, earnings statistics, and reputation score.", icon: "/images/icons/dashboard-circle-edit.png" },
  { title: "Immersive Service Listings", description: "Browse through holographic 3D previews of services, allowing you to visualize projects before engaging.", icon: "/images/icons/search-list-01.png" },
  { title: "Real-time Collaboration Spaces", description: "Virtual rooms where freelancers and clients can meet, discuss projects, and share ideas in a secure environment.", icon: "/images/icons/time-quarter-pass.png" },
  { title: "Blockchain-Verified Profiles", description: "Each user's profile displays their on-chain reputation, skills, and transaction history, ensuring transparency and trust.", icon: "/images/icons/user-check-01.png" },
  { title: "Smart Contract Wizard", description: "An AI-assisted tool that helps create custom, fair agreements between parties with just a few clicks.", icon: "/images/icons/agreement-02.png" },
  { title: "Token Swap Integration", description: "Seamlessly exchange various cryptocurrencies without leaving the platform, ensuring you're always ready for your next transaction.", icon: "/images/icons/coins-swap.png" },
  { title: "Decentralized Review System", description: "Leave and receive feedback that's permanently recorded on the blockchain, building a trustworthy ecosystem.", icon: "/images/icons/comment-01.png" },
  { title: "AI Task Matching", description: "Our advanced algorithms continuously analyze your skills and preferences to suggest the most suitable projects.", icon: "/images/icons/artificial-intelligence-04.png" },
  { title: "Milestone Tracking", description: "Visual project timelines with smart contract-linked milestones, ensuring clear expectations and timely payments.", icon: "/images/icons/timer-02.png" },
  { title: "Community Governance Portal", description: "Participate in platform decisions through our integrated DAO voting system, right from your dashboard.", icon: "/images/icons/user-group.png" }
];

const TypeWriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  return isComplete ? <span>{text}</span> : <span>{displayText}</span>;
};

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} id="marketplace" className="relative bg-black text-white min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/images/background/bg.png')"}}></div>
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">
            <TypeWriter text="Experience the Soleer Marketplace" delay={30} />
          </h2>
          <p className="text-xl">
            <TypeWriter text="Step into the future of freelancing with our intuitive and powerful marketplace interface:" delay={20} />
          </p>
          <button  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300">
            <a href='marketplace'>Explore the Soleer marketplace</a>
          </button>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card bg-white text-black rounded-lg shadow-lg transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                style={{
                  width: '100%',
                  maxWidth: '727px',
                  padding: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start" style={{ gap: '16px' }}>
                  <Image src={feature.icon} alt="" width={24} height={24} className="mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      <TypeWriter text={feature.title} delay={15} />
                    </h3>
                    <p className="text-gray-600">
                      <TypeWriter text={feature.description} delay={5} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 text-white-400 max-w-4xl mx-auto text-right">
        <TypeWriter 
          text="Soleer's marketplace is designed to be intuitive for newcomers to Web3 while offering powerful features for experienced users. With a focus on user experience, security, and decentralization, Soleer is set to become your go-to platform for the future of work." 
          delay={10} 
        />
      </div>
    </div>
  );
};

export default ExperienceSection;