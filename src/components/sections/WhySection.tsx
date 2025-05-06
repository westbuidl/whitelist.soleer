"use client";
import React, { useState, useEffect, useRef } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="bg-[#111111] rounded-lg p-6 flex flex-col justify-between h-[400px] w-full sm:w-[380px] mx-2">
    <div>
      <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
    <div className="mt-auto self-end">
      <img src={icon} alt={title} className="w-32 h-32 sm:w-48 sm:h-48 object-contain" />
    </div>
  </div>
);

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => (
  <button className="bg-transparent" onClick={onClick}>
    <img 
      src={direction === 'left' ? "/images/icons/prev.png" : "/images/icons/next.png"}
      alt={`${direction} arrow`}
      className="w-10 h-10"
    />
  </button>
);

const WhyChooseSoleerSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features: FeatureCardProps[] = [
    {
      title: "Ultra-low 2% transaction fees",
      description: "",
      icon: "/images/money-off.png"
    },
    {
      title: "Global accessibility",
      description: "- work with anyone, anywhere",
      icon: "/images/assistant-navigation.png"
    },
    {
      title: "Censorship-resistant platform",
      description: "",
      icon: "/images/sync-lock.png"
    },
    {
      title: "Lightning-fast payments powered by Solana",
      description: "",
      icon: "/images/bolt.png"
    },
    {
      title: "Enhanced trust through blockchain transparency",
      description: "",
      icon: "/images/shield-lock.png"
    },
    {
      title: "Flexible payment options with multiple tokens",
      description: "",
      icon: "/images/token-2.png"
    }
  ];

  const scrollTo = (index: number) => {
    if (featuresRef.current) {
      const scrollWidth = featuresRef.current.scrollWidth;
      const itemWidth = scrollWidth / features.length;
      featuresRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : features.length - 1;
      scrollTo(newIndex);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < features.length - 1 ? prevIndex + 1 : 0;
      scrollTo(newIndex);
      return newIndex;
    });
  };

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

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
    <div ref={sectionRef} id="why-soleer" className="bg-[#0A0A0A] text-white py-16 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50"
        style={{ backgroundImage: 'url("/images/Ellipse-why.png")' }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold">Why Choose Soleer?</h2>
          <div className="flex space-x-4">
            <ArrowButton direction="left" onClick={handlePrev} />
            <ArrowButton direction="right" onClick={handleNext} />
          </div>
        </div>
        <div 
          ref={featuresRef}
          className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory -mx-2 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {features.map((feature, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-auto snap-center">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSoleerSection;