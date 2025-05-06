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

const PrivacyPolicy: React.FC = () => {
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
                title="Soleer Privacy Policy" 
                description="Find and hire top freelancers on the Solana blockchain"
            />
      <div className="relative">
        {/* Background image */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full w-[504px] h-[655px] pointer-events-none"
          style={{ backgroundImage: "url('/images/background-gradient.png')" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-16" ref={sectionRef}>

        <h1 className="text-5xl font-bold mb-2">
            <span className="text-white">Privacy Policy for </span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              <TypeWriter text="Soleer" isVisible={isVisible} />
            </span>
          </h1>
          
          <p className="mb-8 text-gray-300">Effective Date: {getCurrentDate()}</p>
          <p className="mb-8 text-gray-300">
            <TypeWriter
              text="At Soleer, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you access or use our services on the Soleer platform."
              isVisible={isVisible}
              delay={10}
            />
          </p>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="1. Information We Collect" isVisible={isVisible} />
            </h2>
            <h3 className="text-2xl font-semibold mb-2">
              <TypeWriter text="a. Personal Information" isVisible={isVisible} />
            </h3>
            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="When you register on the Soleer platform, we may collect the following personal information:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Name" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Email address" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Cryptocurrency wallet address" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Profile details (e.g., skills, services offered, and ratings)" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Payment information (limited to cryptocurrency wallet addresses, as Soleer does not handle fiat payments)" isVisible={isVisible} delay={10} /></li>
            </ul>

            <h3 className="text-2xl font-semibold mb-2">
              <TypeWriter text="b. Non-Personal Information" isVisible={isVisible} />
            </h3>


            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="We may collect non-personal information automatically when you interact with our platform, such as:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Device information (e.g., IP address, browser type, operating system)" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Usage data (e.g., how you use the platform, time spent, and interactions)" isVisible={isVisible} delay={10} /></li>

            </ul>
            <h3 className="text-2xl font-semibold mb-2">
              <TypeWriter text="c. Blockchain Data" isVisible={isVisible} />
            </h3>


            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="Since Soleer operates on the Solana blockchain, certain interactions, such as transactions, will be publicly visible and permanently recorded on the blockchain. This information may include:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Transaction History" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Service Listings" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Reputation Scores" isVisible={isVisible} delay={10} /></li>

            </ul>

            {/* Add more sections as per the image */}
          </section>




          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="2. How We Use Your Information" isVisible={isVisible} />
            </h2>





            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="When you register on the Soleer platform, we may collect the following personal information:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Name" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Email Address" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Profile details (e.g., skills, services offered, and ratings)" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Payment information (limited to cryptocurrency wallet addresses, as Soleer does not handle fiat payments)" isVisible={isVisible} delay={10} /></li>

            </ul>

            {/* Add more sections as per the image */}
          </section>
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="3. Sharing Your Information" isVisible={isVisible} />
            </h2>





            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="Soleer does not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Service Providers: We may share non-personal data with third-party service providers who assist with platform maintenance, analytics, or customer support." isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Legal Requirements: We may disclose your information if required by law or if we believe in good faith that such disclosure is necessary to comply with legal processes, investigate fraud, or protect the rights and safety of Soleer and its users." isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Blockchain: Any transactions conducted on the Soleer platform using the Solana blockchain are publicly recorded and cannot be modified or deleted." isVisible={isVisible} delay={10} /></li>

            </ul>

            {/* Add more sections as per the image */}
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="4. Data Security" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="We take data security seriously and implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or loss. These measures include encryption of sensitive data and regular security audits. However, we cannot guarantee the complete security of information transmitted via the internet or blockchain, and you agree that you share data at your own risk."
                isVisible={isVisible}
                delay={10}
              />
            </p>


            {/* Add more sections as per the image */}
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="5. Use of Cookies" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="Soleer uses cookies and similar tracking technologies to enhance the user experience. These cookies help us analyze platform usage and remember user preferences. You can control cookie preferences through your browser settings, but disabling cookies may limit the functionality of the platform:"
                isVisible={isVisible}
                delay={10}
              />
            </p>


            {/* Add more sections as per the image */}
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="6. Data Retention" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. Blockchain data, such as transaction records, are immutable and cannot be deleted once recorded on the Solana network."
                isVisible={isVisible}
                delay={10}
              />
            </p>


            {/* Add more sections as per the image */}
          </section>
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="7. Your Rights" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="You have certain rights regarding your personal information, including:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Access : You may request access to the personal information we hold about you" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Correction: You may request the correction of inaccurate or incomplete information." isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Deletion: You may request the deletion of your personal information, although some information (such as blockchain data) cannot be removed due to its permanent nature." isVisible={isVisible} delay={10} /></li>

            </ul>







            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="To exercise these rights, please contact us at [contact@soleer.xyz]:"
                isVisible={isVisible}
                delay={10}
              />
            </p>


            {/* Add more sections as per the image */}
          </section>
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="8. Childrens's Privacy" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="Soleer does not knowingly collect personal information from individuals under the age of 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately:"
                isVisible={isVisible}
                delay={10}
              />
            </p>


            {/* Add more sections as per the image */}
          </section>
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="9. Changes to This Privacy Policy" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="Soleer reserves the right to update or modify this Privacy Policy at any time. Changes will be effective upon posting on this page, and we encourage you to review this Privacy Policy periodically. Continued use of the platform after changes are made constitutes acceptance of the updated policy:"
                isVisible={isVisible}
                delay={10}
              />
            </p>


            {/* Add more sections as per the image */}
          </section>
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <TypeWriter text="10. Contact Us" isVisible={isVisible} />
            </h2>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="If you have any questions or concerns about this Privacy Policy or the data we collect, please contact us at:"
                isVisible={isVisible}
                delay={10}
              />
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><TypeWriter text="Email:contact@soleer.xyz" isVisible={isVisible} delay={10} /></li>
              <li><TypeWriter text="Address : SoleerLabs London England" isVisible={isVisible} delay={10} /></li>

            </ul>

            <p className="mb-4 text-gray-300">
              <TypeWriter
                text="By using the Soleer platform, you acknowledge that you have read, understood, and agreed to this Privacy Policy."
                isVisible={isVisible}
                delay={10}
              />
            </p>




            {/* Add more sections as per the image */}
          </section>
          

          {/* Add more sections for the rest of the privacy policy */}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;