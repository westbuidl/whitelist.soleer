import React, { useState, useEffect, useRef } from 'react';
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/common/Navbar";
import "../app/globals.css";

interface TypeWriterProps {
  text: string;
  delay?: number;
  isVisible: boolean;
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

const DataSafetyPolicy: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navItems = [
    { title: 'DASHBOARD', href: '../dashboard' },
    { title: 'INBOX', href: '../inbox' },
    { title: 'PROFILE', href: '../profile' },
    { title: 'MARKETPLACE', href: '/' },
    { title: 'SOLEER HOME', href: 'soleer.xyz' },
    { title: 'FAQ', href: '../faq' },
  ];

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };


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
    <div className="min-h-screen text-white bg-[#0C0C1D]">
      <Navbar 
                navItems={navItems} 
                title="Soleer Data Safety" 
                description="Find and hire top freelancers on the Solana blockchain"
            />
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full w-[504px] h-[655px] pointer-events-none"
          style={{ backgroundImage: "url('/images/background-gradient.png')" }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-16 pb-24" ref={sectionRef}>
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-white">Soleer </span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              <TypeWriter text="Data Safety Policy" isVisible={isVisible} />
            </span>
          </h1>
          <p className="mb-8 text-gray-300">Effective Date: {getCurrentDate()}</p>
          <p className="mb-8 text-gray-300">
            At Soleer, the security and privacy of our users' data are of utmost importance. This Data Safety Policy explains the measures and practices we implement to protect your personal information and data when using the Soleer platform.
          </p>
          
          {/* Policy sections */}
          <Section title="1. Data Collection and Privacy">
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Soleer collects only the information necessary to operate and improve our platform. This includes:</li>
              <li>Personal Information: Such as your name, email address, cryptocurrency wallet address, and profile details.</li>
              <li>Non-Personal Information: Device information, IP address, and usage data.</li>
              <li>Transaction Data: Recorded on the Solana blockchain, which is public and immutable.</li>
              <li>Data Minimization: We collect the minimum amount of personal data necessary to provide our services.</li>
            </ul>
          </Section>
          
          <Section title="2. Data Encryption">
            <p className="mb-4 text-gray-300">We use encryption to protect sensitive information:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>In-Transit Encryption: Data transferred between your device and our servers is encrypted using SSL/TLS protocols, safeguarding against unauthorized interception.</li>
              <li>At-Rest Encryption: Sensitive information stored in our databases is encrypted with advanced encryption standards to prevent unauthorized access.</li>
            </ul>
          </Section>

          <Section title="3. Blockchain Security">
            <p className="mb-4 text-gray-300">Transactions and key operations are recorded on the Solana blockchain, which provides security through its decentralized and transparent nature:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Immutable Records: Transactions on the blockchain cannot be altered or deleted.</li>
<li>Public Visibility: Blockchain transactions, including wallet addresses and amounts, are publicly accessible, although users can maintain pseudonymity.</li>
            </ul>
          </Section>
          
          <Section title="4. Smart Contracts and Automation">
            <p className="mb-4 text-gray-300">Soleer uses Solana-based smart contracts for various platform operations, including escrow, reputation management, and dispute resolution. These smart contracts:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Automate secure transactions between freelancers and clients, reducing the need for manual intervention.</li>
<li>Minimize fraud risks through automated escrow systems that release funds only when both parties fulfill their agreements.</li>
            </ul>
            <p className="mb-4 text-gray-300">
Smart Contract Audits: We conduct regular audits by third-party blockchain security firms to maintain the integrity of our smart contracts.</p>
          </Section>

          <Section title="5. Smart Contracts and Automation">
            <p className="mb-4 text-gray-300">We implement strict access controls to protect sensitive platform data:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>User Authentication: Access is secured through password-protected accounts and cryptocurrency wallets. We recommend enabling two-factor authentication (2FA) for enhanced security.</li>
<li>Role-Based Access Control (RBAC): Access to internal data is restricted based on roles, ensuring sensitive information is only accessible to authorized personnel.</li>
            </ul>
            
          </Section>

          <Section title="6. Data Storage and Retention">
            <p className="mb-4 text-gray-300">Soleer securely stores data using cloud infrastructure with industry-standard security measures:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Regular Backups: We regularly back up important data to prevent loss during system failures.</li>
<li>Data Retention Policy: We retain personal data only as long as necessary for the purposes it was collected. However, blockchain transaction data remains permanently due to its immutable nature.</li>
            </ul>
            
          </Section>

          <Section title="7. Vulnerability Management and Security Audits">
            <p className="mb-4 text-gray-300">Soleer regularly monitors its systems to identify and address vulnerabilities:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Vulnerability Scanning: We scan for known vulnerabilities in the platform’s code and infrastructure.</li>
<li>Security Patches: We promptly apply updates and patches to address any identified vulnerabilities.</li>
<li>Third-Party Security Audits: External cybersecurity experts conduct periodic audits to ensure compliance with industry data protection standards.</li>
            </ul>
            
          </Section>

          <Section title="8. Incidence Response Plan">
            <p className="mb-4 text-gray-300">Soleer regularly monitors its systems to identify and address vulnerabilities:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Immediate Identification and Containment to minimize potential damage.</li>
<li>Investigation to determine the scope and impact of the breach.</li>
<li>User Notification in compliance with legal requirements if personal information is compromised.</li>
<li>Corrective Actions such as updating security measures and conducting post-incident reviews.</li>
            </ul>
            
          </Section>

          <Section title="9. User Responsibilities">
            <p className="mb-4 text-gray-300">To enhance the safety of your data, Soleer users are advised to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Protect login credentials: Use strong passwords and enable two-factor authentication (2FA) if available.</li>
<li>Safeguard cryptocurrency wallets: Keep private keys and recovery phrases secure. Soleer does not store or request private keys.</li>
<li>Be cautious of phishing attempts: Avoid responding to messages requesting wallet information. Soleer will never ask for private keys or passwords.</li>
            </ul>
            
          </Section>

          <Section title="10. Third-Party Integrations">
            <p className="mb-4 text-gray-300">Soleer may integrate with third-party services to improve platform functionality:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Protect login credentials: Use strong passwords and enable two-factor authentication (2FA) if available.</li>
<li>We ensure that these third parties comply with data protection and privacy standards.</li>
<li>Any shared data is subject to strict agreements to ensure confidentiality and security.</li>
            </ul>
            
          </Section>

          <Section title="11. Compliance with Data Protection Regulations">
            <p className="mb-4 text-gray-300">Soleer complies with global data protection regulations, including:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>GDPR (General Data Protection Regulation) for European users, ensuring rights like access, rectification, and erasure.</li>
<li>CCPA (California Consumer Privacy Act) for California residents, ensuring transparency in data collection, use, and sharing.</li>
            </ul>
            <p className="mb-4 text-gray-300">We regularly update our policies to remain compliant with relevant data protection laws.</p>
          </Section>

          <Section title="12. Reporting Security Vulnerabilities">
            <p className="mb-4 text-gray-300">We encourage responsible disclosure of security vulnerabilities. If you discover a vulnerability, please report it to <b>contact@soleer.xyz</b> We will investigate and take action as necessary.</p>
            
          </Section>


          {/* Add more sections here following the same pattern */}
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </section>
);

export default DataSafetyPolicy;