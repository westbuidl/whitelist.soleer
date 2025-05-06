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

const TermsAndConditions: React.FC = () => {
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
                title="Soleer Terms of Service" 
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
              <TypeWriter text="Terms and Conditions" isVisible={isVisible} />
            </span>
          </h1>
          <p className="mb-8 text-gray-300">Effective Date: {getCurrentDate()}</p>
          <p className="mb-8 text-gray-300">
            Welcome to Soleer, a peer-to-peer service marketplace powered by the Solana blockchain. By using our platform, you agree to comply with these Terms and Conditions. Please read these Terms carefully, as they govern your use of the Soleer platform and services. If you do not agree to these Terms, you may not use Soleer.
          </p>

          <Section title="1. Acceptance of Terms">
            <p className="text-gray-300">
              By registering, accessing, or using the Soleer platform, you confirm that you have read, understood, and agree to be bound by these Terms. These Terms may be updated from time to time, and your continued use of the platform after such updates constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p className="text-gray-300">
              You must be at least 18 years of age or the legal age of majority in your jurisdiction. By using Soleer, you represent and warrant that you meet this requirement.
            </p>
          </Section>

          <Section title="3. Platform Overview">
            <p className="text-gray-300">
              Soleer operates as a decentralized marketplace where:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Freelancers (Service Providers) offer services.</li>
              <li>Clients can browse, purchase, and review services.</li>
              <li>Payments, reputation management, and dispute resolution are handled through smart contracts on the Solana blockchain.</li>
            </ul>
          </Section>

          <Section title="4. Account Registration and Responsibilities">
            <p className="text-gray-300">
              To use Soleer, you must create an account and provide accurate, complete information.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>You are responsible for maintaining the confidentiality of your account and cryptocurrency wallet information.</li>
              <li>You agree to notify us about any unauthorized or suspicious activity in your account.</li>
              <li>You are solely responsible for all activities that occur under your account and for all interactions with other users.</li>
            </ul>
          </Section>

          <Section title="7. Dispute Resolution">
            <p className="text-gray-300">
              Soleer provides a decentralized dispute resolution system for addressing conflicts between clients and freelancers. The dispute resolution process includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Direct Communication: Users are encouraged to resolve issues through communication before escalating a dispute.</li>
              <li>Smart Contract Enforcement: If a dispute arises, Soleer’s smart contracts automatically enforce the terms agreed upon by both parties.</li>
              <li>Third-Party Arbitration: In certain cases, disputes may be escalated to neutral third-party arbiters or Soleer’s support team for a final decision. The decision of the arbiter is binding.</li>
            </ul>
          </Section>

          <Section title="8. Prohibited Activities">
            <p className="text-gray-300">
              By using Soleer, you agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Fraud or Misrepresentation: Providing false information, impersonating another person, or misrepresenting services.</li>
              <li>Violation of Laws: Using the platform for any illegal activities or in violation of applicable laws.</li>
              <li>Abusive Behavior: Harassing, threatening, or discriminating against other users.</li>
              <li>Infringing on Intellectual Property: Offering services that violate intellectual property rights or the rights of third parties.</li>
              <li>Manipulation of Ratings: Falsely inflating or deflating user ratings or reviews.</li>
            </ul>
          </Section>

          <Section title="9. Intellectual Property Rights">
            <p className="text-gray-300">
              All intellectual property on Soleer, including but not limited to platform design, functionality, and content (excluding user-generated content), is the property of Soleer and is protected by intellectual property laws.
              Users retain ownership of the content they create on the platform. However, by posting content on Soleer, you grant Soleer a worldwide, non-exclusive, royalty-free license to use, display, and distribute the content solely for the purpose of providing and promoting the platform
            </p>

          </Section>

          <Section title="10. Data Privacy and Security">
            <p className="text-gray-300">
              Soleer is committed to protecting your personal data. Please refer to our [Privacy Policy] for details on how we collect, use, and store your information.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Blockchain Data: Transactions conducted on the Solana blockchain are immutable and publicly visible. You understand that blockchain data, including wallet addresses and transaction amounts, cannot be modified or deleted.</li>
              <li>Security: While Soleer implements industry-standard security measures, you are responsible for safeguarding your account information, wallet keys, and any other personal information associated with your use of the platform.</li>
            </ul>
          </Section>

          <Section title="11. Termination of Account">
            <p className="text-gray-300">
            Soleer reserves the right to suspend or terminate your account at its sole discretion if:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
           <li>You violate any provisions of these Terms.</li>
           <li>You engage in fraudulent or abusive behavior.</li>
            <li>We are required to do so by law or regulatory authorities.</li>
            </ul>
            <p className="text-gray-300">
            Upon termination, you will no longer be able to access your account, and any pending transactions may be canceled.
            </p>
          </Section>

          <Section title="12. Limitation of Liability">
            <p className="text-gray-300">
            Soleer operates as a decentralized marketplace and, to the fullest extent permitted by law, is not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
           
            <li>User Conduct: Soleer is not liable for the actions or content posted by users on the platform.</li>
            <li>Service Quality: Soleer does not guarantee the quality, accuracy, or reliability of services provided by freelancers.</li>
            <li>Blockchain Risks: Soleer is not responsible for any losses resulting from the use of cryptocurrency, including volatility, hacking, or other risks associated with blockchain technology.</li>
            </ul>
            <p className="text-gray-300">
            Soleer’s total liability for any claim arising from your use of the platform shall not exceed the total fees paid by you to Soleer in the three months preceding the claim.
            </p>
          </Section>

          <Section title="13. Disclaimer of Warranties">
            <p className="text-gray-300">
            Soleer provides the platform "as is" and "as available" without any warranties or guarantees of any kind, either express or implied. Soleer disclaims all warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            
          </Section>

          <Section title="14. Indemnification">
            <p className="text-gray-300">
            You agree to indemnify, defend, and hold harmless Soleer, its affiliates, officers, directors, and employees from and against any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
           
            <li>Your use of the platform.</li>
<li>Your violation of these Terms.</li>
<li>Your violation of any rights of a third party, including intellectual property rights.</li>
            </ul>
            
          </Section>

          <Section title="15. Force Majeure">
            <p className="text-gray-300">
            Soleer will not be liable for any delay or failure to perform any obligation under these Terms due to circumstances beyond its reasonable control, including but not limited to natural disasters, internet outages, blockchain network failures, or acts of government.
            </p>
            
          </Section>

          <Section title="16. Changes to Terms">
            <p className="text-gray-300">
            Soleer reserves the right to modify or update these Terms at any time. If we make material changes, we will notify users via email or through the platform. Your continued use of the platform after such changes constitutes acceptance of the updated Terms.
            </p>
            
          </Section>

          <Section title="17. Contact Information">
            <p className="text-gray-300">
            If you have any questions or concerns regarding these Terms, please contact us at:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
           
            <li>Email: [Insert Contact Information]</li>
<li>Address: [Insert Physical Address, if applicable]</li>
            </ul>
            
            <p className="text-gray-300">
            By using Soleer, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These Terms ensure the safety, fairness, and integrity of the Soleer marketplace for all users.
            </p>
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

export default TermsAndConditions;