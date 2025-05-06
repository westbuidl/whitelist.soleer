"use client";
import React, { useState, useEffect, useRef } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  delay: number;
}

const TypeWriter: React.FC<{ text: string; delay?: number; inView: boolean }> = ({ text, delay = 50, inView }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!inView) return;
    
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
  }, [text, delay, inView]);

  return <span>{displayText}</span>;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className, titleClassName, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`bg-[#0B0C0D] rounded-tl-xl p-4 sm:p-6 flex flex-col border border-[#333333] ${className} transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform translate-y-10'
      }`}
    >
      <img src={icon} alt={title} className="w-8 h-8 sm:w-11 sm:h-11 mb-2 sm:mb-4" />
      <h3 className={`text-white font-bold mb-1 sm:mb-2 font-['Neue_Machina'] text-xl sm:text-2xl md:text-[32px] leading-tight sm:leading-[38.4px] tracking-[-0.01em] ${titleClassName}`}>
        <TypeWriter text={title} delay={30} inView={isVisible} />
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm">
        <TypeWriter text={description} delay={20} inView={isVisible} />
      </p>
    </div>
  );
};

const HowSoleerWorks: React.FC = () => {
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
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

  const features: FeatureCardProps[] = [
    {
      icon: "/images/icons/profile.png",
      title: "Create Profile & List Services",
      description: "Create your profile and list your services on the blockchain",
      titleClassName: "w-full sm:w-[270px] h-auto sm:h-[76px]",
      delay: 0
    },
    {
      icon: "/images/icons/ai-powered.png",
      title: "Connect via AI Matching",
      description: "Connect with clients through our AI-powered matching system",
      titleClassName: "w-full sm:w-[263px] h-auto sm:h-[76px]",
      delay: 200
    },
    {
      icon: "/images/icons/smart-contract.png",
      title: "Secure with Smart Contracts",
      description: "Secure your transaction with our smart contract escrow",
      titleClassName: "w-full sm:w-[309px] h-auto sm:h-[76px]",
      delay: 400
    },
    {
      icon: "/images/icons/paid.png",
      title: "Deliver & Get Paid",
      description: "Deliver your work and receive instant payment",
      titleClassName: "w-full sm:w-[270px] h-auto sm:h-[76px]",
      delay: 600
    },
    {
      icon: "/images/icons/profile.png",
      title: "Build Your Reputation",
      description: "Build your on-chain reputation with every successful project",
      titleClassName: "w-full sm:w-[270px] h-auto sm:h-[76px]",
      delay: 800
    }
  ];

  return (
    <div ref={sectionRef} id="how-it-works" className="bg-[#020301] text-white py-8 sm:py-16 px-4">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-transparent bg-clip-text">
          <TypeWriter text="How Soleer Works" delay={50} inView={sectionInView} />
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {features.slice(0, 2).map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                className="flex-1 h-auto sm:h-[258px] pt-4"
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {features.slice(2).map((feature, index) => (
              <FeatureCard 
                key={index + 2} 
                {...feature} 
                className="flex-1 h-auto sm:h-[258px] pt-4 sm:pt-6"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowSoleerWorks;