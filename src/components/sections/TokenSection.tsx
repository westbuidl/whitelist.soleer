"use client"
import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface TokenData {
  name: string;
  value: number;
  color: string;
}

interface PieLabelRenderProps {
  cx?: number;
  cy?: number;
  percent?: number;
  value?: number;
  x?: number;
  y?: number;
  name?: string;
  fill?: string;
}

const tokenData: TokenData[] = [
  { name: 'Public', value: 60, color: '#00FFFF' },
  { name: 'Platform Development and Operations', value: 15, color: '#FFA500' },
  { name: 'Early Platform Participants', value: 10, color: '#90EE90' },
  { name: 'Community Rewards and Ecosystem Growth', value: 10, color: '#FF4500' },
  { name: 'Strategic Partnerships and Marketing', value: 5, color: '#8A2BE2' },
];

interface TypeWriterProps {
  text: string;
  speed?: number;
  inView: boolean;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, speed = 50, inView }) => {
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
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, inView]);

  return <span>{displayText}</span>;
};




const TokenSection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [pieChartKey, setPieChartKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setPieChartKey(prev => prev + 1); // Trigger pieChart re-render
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

  const renderCustomLabel = (props: PieLabelRenderProps): string => {
    const { percent = 0 } = props;
    return `${(percent * 100).toFixed(0)}%`;
  };



  return (
    <div 
    ref={sectionRef} id="governance"
    className={`bg-black text-white min-h-screen relative overflow-hidden transition-opacity duration-1000 ${
      inView ? 'opacity-100' : 'opacity-0'
    }`}
  >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('/images/Ellipse-token.png')",
          mixBlendMode: 'screen',
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TypeWriter text="$SLR Token: Powering the Soleer Ecosystem" inView={inView} />
        </h1>
        <p className="text-gray-400 mb-16 text-sm md:text-base">
        The $SLR token is the core of the Soleer marketplace, playing a crucial role in enabling decentralized governance and unlocking valuable utilities for both freelancers and clients. Designed to foster alignment across the platform, $SLR empowers users to participate actively in the platform's evolution and gain access to premium benefits.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          <TypeWriter text="Token Metrics" speed={70} inView={inView} />
        </h2>
        <p className="text-purple-500 mb-1 text-sm md:text-base">Total Supply: 21,000,000 $SLR</p>
        <p className="text-purple-500 mb-16 text-sm md:text-base">Token Standard: SPL </p>

        <div className="flex flex-col md:flex-row mb-16">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <ResponsiveContainer width="100%" height={300}>
        <PieChart key={pieChartKey}>
          <Pie
            data={tokenData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            animationBegin={0}
            animationDuration={1000}
            label={renderCustomLabel}
          >
            {tokenData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">
              <TypeWriter text="Token Allocation" speed={70} inView={inView} />
            </h3>
            {tokenData.map((item, index) => (
              <p key={index} className="mb-2 text-sm md:text-base" style={{color: item.color}}>
              {`${item.value}% (${(item.value * 210000).toLocaleString()} $SLR): ${item.name}`}
            </p>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          <TypeWriter text="Utility and Governance" speed={70} inView={inView} />
        </h2>
        <ul className="list-disc list-inside mb-16 text-sm md:text-base space-y-2">
          <li>Governance: $SLR holders can participate in platform decisions through our DAO.</li>
          <li>Fee Discounts: Pay platform fees with $SLR for significant discounts.</li>
          <li>Staking Rewards: Earn passive income by staking $SLR to secure the network.</li>
          <li>Premium Features: Unlock advanced tools and priority support with $SLR.</li>
          <li>Reputation Boosting: Increase visibility of your services by staking $SLR.</li>
        </ul>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <TypeWriter text="Driving Platform Growth" speed={70} inView={inView} />
        </h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
        Whether through governance participation, accessing premium features, or earning staking rewards, $SLR is designed to empower users and create a thriving, decentralized digital marketplace. Become an integral part of a decentralized marketplace designed for the future of the gig economy. Stay tuned for upcoming announcements on how you can acquire $SLR tokens and start benefiting from its powerful utilities.
        </p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded text-sm md:text-base hover:bg-purple-700 transition-colors duration-300">
        <a href='marketplace'>Join the Decentralized economy</a>
        </button>
      </div>
    </div>
  );
};

export default TokenSection;