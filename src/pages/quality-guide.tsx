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

const QualityGuide: React.FC = () => {
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
                title="Soleer Quality Guide" 
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
              <TypeWriter text="Quality Guide" isVisible={isVisible} />
            </span>
          </h1>
          <p className="mb-8 text-gray-300">Effective Date: {getCurrentDate()}</p>
          <p className="mb-8 text-gray-300">
            At Soleer, we are committed to delivering a seamless and high-quality user experience for freelancers and clients alike. This Quality Guide outlines our standards and practices, ensuring the platform remains efficient, reliable, and valuable for all users. By adhering to these guidelines, both service providers and clients can contribute to maintaining a professional and trustworthy marketplace.
          </p>

          <Section title="1. Service Provider Quality Standards">
            <Subsection title="a. Profile Completeness">
              <p className="mb-4 text-gray-300">A complete profile enhances your credibility on the platform. Ensure that:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Your profile includes all necessary personal information, such as a professional bio, relevant skills, and services offered.</li>
                <li>You have a clear, professional profile picture.</li>
                <li>Your portfolio showcases your best work samples, if applicable, to showcase your expertise and attract potential clients.</li>
                <li>All information is kept up-to-date to ensure accurate representation.</li>
                <li>Your cryptocurrency wallet address is up-to-date for smooth payment processing.</li>
              </ul>
            </Subsection>
            <Subsection title="b. Clear and Accurate Service Listings">
              <p className="mb-4 text-gray-300">When creating service listings:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Clearly define the services you offer, including a comprehensive description of your expertise and deliverables.</li>
                <li>Set realistic pricing and delivery timelines to manage client expectations.</li>
                <li>Be transparent about any additional fees or requirements that may affect the final cost or timeline.</li>
                <li>Use relevant keywords and categories to make it easier for clients to find your services.</li>
              </ul>
            </Subsection>
            <Subsection title="c. Professionalism and Communication">
              <p className="mb-4 text-gray-300">Clear and professional communication is essential for successful projects. As a service provider, you should:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Respond promptly to client inquiries and messages.</li>
                <li>Communicate clearly about project requirements, timelines, and any potential issues.</li>
                <li>Provide regular updates on project progress.</li>
                <li>Maintain a respectful and professional tone at all times</li>
              </ul>
            </Subsection>
            <Subsection title="d. Timely Delivery of Services">
              <p className="mb-4 text-gray-300">To ensure client satisfaction, you must:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Deliver work within the agreed-upon timeframe. If delays occur, inform the client promptly and negotiate a new deadline if necessary.</li>
                <li>Provide high-quality deliverables that align with the project specifications agreed upon at the start.</li>
                <li>Make reasonable revisions if requested by the client, provided they align with the original agreement.</li>
              </ul>
            </Subsection>

            <Subsection title="e. Reputation and Ratings">
              <p className="mb-4 text-gray-300">Your reputation is crucial to attracting future clients. To maintain it:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Consistently deliver quality work that meets client expectations.</li>
                <li>Request honest feedback from clients after completing projects.</li>
                <li>Maintain a high rating by fulfilling commitments, delivering quality work, and avoiding disputes.</li>
              </ul>
            </Subsection>
            {/* Add more subsections here */}
          </Section>

          <Section title="2. Client Quality Standards">
            <p className="mb-4 text-gray-300">Clients also have responsibilities to ensure a positive and productive environment on Soleer:</p>
            <Subsection title="a. Clear Job Descriptions">
              <p className="mb-4 text-gray-300">To attract the right freelancers, you must:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Provide detailed and accurate descriptions of the services you need, including clear project requirements.</li>
                <li>Specify your budget range and timeline expectations.</li>
                <li>State your goals and desired outcomes clearly to avoid misunderstandings.</li>
              </ul>
            </Subsection>

            <Subsection title="b. Professionalism and Commmunication">
              <p className="mb-4 text-gray-300">Clients should also:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Respond promptly to freelancer inquiries and messages.</li>
                <li>Communicate expectations clearly and provide constructive feedback throughout the project.</li>
                <li>Address any issues in a respectful and professional manner.</li>
              </ul>
            </Subsection>
            <Subsection title="c. Timely Payments">
              <p className="mb-4 text-gray-300">Freelancers depend on prompt payment for their work. As a client, you must:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Ensure your cryptocurrency wallet is funded before starting a project.</li>
                <li>Release payments through the platform’s escrow system once the work is completed to your satisfaction.</li>
                <li>Avoid unnecessary delays in payments unless there are valid reasons.</li>
              </ul>
            </Subsection>

            <Subsection title="d. Feedback and Ratings">
              <p className="mb-4 text-gray-300">Providing honest feedback helps freelancers build their reputation. You should:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Leave fair and constructive reviews based on your experience with the freelancer.</li>
                <li>Base your ratings on the quality of work, communication, and adherence to deadlines.</li>
              </ul>
            </Subsection>
            
            {/* Add more subsections here */}
          </Section>

          <Section title="3. Quality Assurance Mechanisms">
            <p className="mb-4 text-gray-300">Soleer implements several quality control measures to maintain high service standards:</p>
            <Subsection title="a. Smart Contracts for Escrow and Dispute Resolution">
              <p className="mb-4 text-gray-300">Soleer uses Solana-based smart contracts to manage payments and disputes:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Escrow System: Payments are held in escrow until the service is satisfactorily completed, ensuring freelancers are compensated while protecting clients from incomplete or substandard work.</li>
                <li>Dispute Resolution: In case of disputes, smart contracts enforce terms and conditions automatically, ensuring fair resolution. Disputes may be escalated to third-party arbiters or Soleer's internal team for review.</li>
              </ul>
            </Subsection>
            <Subsection title="b. Reputation and Rating System">
              <p className="mb-4 text-gray-300">A transparent system holds users accountable.</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Freelancer Ratings: Freelancers are rated based on performance, communication, and adherence to deadlines. Higher ratings boost visibility.</li>
                <li>Client Ratings: Clients are also rated by freelancers, promoting professional behavior and timely payments.</li>
                <li>Immutable Records: Ratings and transactions are recorded on the blockchain, ensuring transparency and accountability.</li>
              </ul>
            </Subsection>
            <Subsection title="c. Random Quality Audits">
              <p className="mb-4 text-gray-300">Soleer conducts random audits of service listings and transactions to ensure compliance:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Reviews the accuracy of profiles and service listings.</li>
                <li>Checks for consistency in service quality.</li>
                <li>Identifies and addresses potential fraudulent or abusive behavior.</li>
              </ul>
            </Subsection>
            {/* Add more subsections here */}
          </Section>

          <Section title="4. Dispute Prevention and Resolution">
            <p className="mb-4 text-gray-300">To minimize disputes, both parties should follow these guidelines:</p>
            <Subsection title="a. Clear Agreements">
              <p className="mb-4 text-gray-300">Before starting a project:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Agree on the scope of work, timeline, and deliverables.</li>
                <li>Document any special requirements or revisions to avoid misunderstandings.</li>
                <li>State your goals and desired outcomes clearly to avoid misunderstandings.</li>
              </ul>
            </Subsection>
            <Subsection title="b. Escrow for Protection">
              <p className="mb-4 text-gray-300">Always use Soleer’s escrow feature for payment management, ensuring funds are available and released only when both parties are satisfied.</p>
              
            </Subsection>
            <Subsection title="c. If a dispute arises">
              <p className="mb-4 text-gray-300">Always use Soleer’s escrow feature for payment management, ensuring funds are available and released only when both parties are satisfied.</p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Attempt direct communication first to resolve issues.</li>
                <li>If unresolved, initiate Soleer’s dispute resolution process, involving third-party review and smart contract enforcement</li>
              </ul>
            </Subsection>
            {/* Add more subsections here */}
          </Section>

          <Section title="5. Platform Conduct and Community Guidelines">
            <p className="mb-4 text-gray-300">To maintain a positive and professional environment, all users must:</p>


            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Treat others with respect: Discrimination, harassment, or abusive behavior is not tolerated..</li>
              <li>Avoid fraudulent activities: Soleer has a zero-tolerance policy for fraud, such as misrepresenting skills, failing to deliver services, or manipulating reviews.</li>
              <li>Report suspicious behavior: Report any rule violations or fraudulent activity to Soleer’s support team for investigation..</li>
            </ul>

            {/* Add more subsections here */}
          </Section>

          <Section title="6. Continous Improvement">
            <p className="mb-4 text-gray-300">Soleer is committed to continuously improving the platform. We encourage users to provide feedback to help us:</p>


            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Enhance platform features and functionality.</li>
              <li>Improve dispute resolution processes.</li>
              <li>Address emerging challenges in service quality.</li>
            </ul>

            {/* Add more subsections here */}
          </Section>

          <Section title="7. User Education and Support">
            <p className="mb-4 text-gray-300">Soleer offers resources to support users:</p>


            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Knowledge Base and Tutorials: Guides and tutorials help users navigate the platform and optimize features..</li>
              <li>Customer Support: Our support team is available for timely assistance if you encounter issues.</li>

            </ul>

            {/* Add more subsections here */}
          </Section>

          <Section title="8. Compliance with Laws and Regulations">
            <p className="mb-4 text-gray-300">All users must comply with local and international laws, including:</p>
            

              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Intellectual property rights.</li>
                <li>Employment laws.</li>
                <li>Tax regulations.</li>
              </ul>
              <p className="mb-4 text-gray-300">Violating platform rules or applicable laws may result in account suspension or removal.</p>
            
            {/* Add more subsections here */}
          </Section>

          <Section title="9.  Updates to the Quality Guide">
            <p className="mb-4 text-gray-300">Soleer may update this guide periodically to reflect policy or industry changes. Users are encouraged to review the guide regularly to stay informed of any updates.</p>

            <p className="mb-4 text-gray-300">By using Soleer, you acknowledge that you have read, understood, and agree to follow the practices outlined in this Quality Guide. These guidelines ensure Soleer remains a high-quality, professional platform for freelancers and clients to collaborate successfully.</p>

            {/* Add more subsections here */}
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

const Subsection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default QualityGuide;