import React, { useEffect, useRef } from 'react';

const TokenDistributionChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const data = [
      { percentage: 65, color: '#8A2BE2' },
      { percentage: 7, color: '#90EE90' },
      { percentage: 10, color: '#FFA500' },
      { percentage: 5, color: '#FF69B4' },
      { percentage: 9, color: '#00CED1' },
      { percentage: 4, color: '#20B2AA' }
    ];

    let startAngle = 0;
    data.forEach((item, index) => {
      const ellipse = document.createElement('div');
      ellipse.className = 'ellipse';
      const size = 100 - index * 15;
      const arcLength = (item.percentage / 100) * Math.PI * 2;
      ellipse.style.width = `${size}%`;
      ellipse.style.height = `${size}%`;
      ellipse.style.top = `${(100 - size) / 2}%`;
      ellipse.style.left = `${(100 - size) / 2}%`;
      ellipse.style.borderColor = item.color;
      ellipse.style.borderLeftColor = 'transparent';
      ellipse.style.borderBottomColor = 'transparent';
      ellipse.style.transform = `rotate(${startAngle}rad)`;
      ellipse.style.animation = `spin ${20 + index * 5}s linear infinite`;
      chart.appendChild(ellipse);
      startAngle += arcLength;
    });

    // Cleanup function to remove created elements when component unmounts
    return () => {
      while (chart.firstChild) {
        chart.removeChild(chart.firstChild);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex justify-center items-center bg-black_hero_bg bg-center bg-no-repeat bg-cover">
      <div className="chart-container">
        <h2>Token distribution</h2>
        <ul className="distribution-list">
          <li className="distribution-item public-sale">65% Public sale</li>
          <li className="distribution-item partnership">7% Partnership</li>
          <li className="distribution-item liquidity">10% Liquidity</li>
          <li className="distribution-item cex">5% CEX</li>
          <li className="distribution-item marketing">9% Marketing</li>
          <li className="distribution-item team">4% Team</li>
        </ul>
        <div className="chart" ref={chartRef}>
          <div className="center-logo">R</div>
        </div>
      </div>
    </div>
  );
};

export default TokenDistributionChart;