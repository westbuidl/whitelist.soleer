"use client"
import React, { useState, useEffect, useRef } from 'react';
import SecondaryBtn from "../ui/secondaryBtn";

interface FeatureData {
  icon: string;
  title: string;
  description: string;
}

interface FeatureCardProps extends FeatureData {
  isVisible: boolean;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isVisible, delay }) => {
  const [cardVisible, setCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setCardVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div 
      ref={cardRef}
      className={`w-full h-full p-6 bg-black rounded-lg border border-gray-700 transition-all duration-1000 ${
        cardVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
      }`}
    >
      <div className="mb-4">
        <img src={`/images/icons/${icon}`} alt={title} className="w-11 h-11" />
      </div>
      <h3 className="text-white text-2xl font-extrabold mb-2 w-96 font-['Neue_Machina'] leading-[28.8px] tracking-[-0.01em]">
        <TypeWriter text={title} isVisible={cardVisible} />
      </h3>
      <p className="text-gray-400 text-sm">
        <TypeWriter text={description} isVisible={cardVisible} delay={20} />
      </p>
    </div>
  );
};

const TypeWriter: React.FC<{ text: string; delay?: number; isVisible: boolean }> = ({ text, delay = 50, isVisible }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay, isVisible]);

  return <span>{displayText}</span>;
};

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features: FeatureData[] = [
    {
      icon: "decentralized-service.png",
      title: "Decentralized Service Listings",
      description: "Freelancers list services on a secure, decentralized platform, ensuring transparency and trust for all users."
    },
    {
      icon: "smart-contract.png",
      title: "Smart Contract-based Escrow System",
      description: "Payments are securely held in escrow until milestones are met, ensuring fairness for both freelancers and clients."
    },
    {
      icon: "on-chain-reputation.png",
      title: "On-chain Reputation Management",
      description: "Reputations are stored immutably on the blockchain, transparent performance histories for freelancers and clients."
    },
    {
      icon: "multi-token.png",
      title: "Multi-token Support",
      description: "Soleer supports various cryptocurrencies, enabling flexible global payments in preferred tokens."
    },
    {
      icon: "ai-powered.png",
      title: "AI-powered Recommendations",
      description: "AI matches users with the best opportunities, enhancing collaboration and success rates."
    },
    {
      icon: "dispute-resolution.png",
      title: "Decentralized Dispute Resolution",
      description: "Conflicts are resolved transparently through smart contracts and community arbitration, ensuring fair outcomes."
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
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
    <div id="about" ref={sectionRef} className="relative bg-[#020301] text-white py-16 px-4 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <TypeWriter text="About Soleer" isVisible={isVisible} />
          </h1>
          <p className="text-gray-400 max-w-5xl">
            <TypeWriter 
              text="Soleer is set to redefine the gig economy landscape. By harnessing the power of Solana's blockchain, we're creating a decentralized platform where freelancers and clients can connect, collaborate, and transact with unprecedented efficiency and security."
              delay={20}
              isVisible={isVisible}
            />
          </p>
        </div>
        <h2 className="text-4xl font-bold mb-8">
          <TypeWriter text="Cutting Edge Features" isVisible={isVisible} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              isVisible={isVisible} 
              delay={index * 200}
            />
          ))}
        </div>
      </div>
      <img 
        src="/images/Ellipse1.png"
        alt="Background glow"
        className="absolute bottom-0 right-0 w-[5004px] h-[655px] opacity-30 rotate-180"
      />
    </div>
  );
};

export default AboutSection;