"use client";
import React, { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  isVisible: boolean;
}

interface RoadmapItemProps {
  quarter: string;
  description: string;
  isVisible: boolean;
  delay: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, delay = 50, isVisible }) => {
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

const RoadmapItem: React.FC<RoadmapItemProps> = ({ quarter, description, isVisible, delay }) => {
  const [itemVisible, setItemVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setItemVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div className={`mb-6 transition-all duration-1000 ${
      itemVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
    }`}>
      <h3 className="font-['Neue_Machina'] text-2xl font-normal text-[#C8FF00] mb-1">
        <TypeWriter text={quarter} delay={100} isVisible={itemVisible} />
      </h3>
      <p className="font-['Inter'] text-sm font-medium text-white">
        <TypeWriter text={description} delay={50} isVisible={itemVisible} />
      </p>
    </div>
  );
};

const RoadMapSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const roadmapItems = [
    { quarter: "Q4 2024", description: "Beta launch for early adopters" },
    { quarter: "Q1 2025", description: "Full platform launch with core features" },
    { quarter: "Q2 2025", description: "Mobile app release for iOS and Android" },
    { quarter: "Q3 2025", description: "Integration of advanced AI features" },
    { quarter: "Q4 2025", description: "Launch of Soleer DAO for community governance" },
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
    <div ref={sectionRef} id="roadmap" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A]">
      <div className="absolute inset-0 bg-[url('/images/Ellipse-side.png')] bg-no-repeat b-cover opacity-80"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-start">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="font-['Neue_Machina'] text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-white mb-4">
            <TypeWriter text="Roadmap to" delay={100} isVisible={isVisible} />
            <br />
            <TypeWriter text="the Future" delay={100} isVisible={isVisible} />
          </h2>
        </div>
        <div className="md:w-1/2 flex flex-col">
          {roadmapItems.map((item, index) => (
            <RoadmapItem 
              key={index} 
              quarter={item.quarter} 
              description={item.description} 
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadMapSection;