"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { 
  Mail, 
  User, 
  Wallet, 
  Coins, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Copy, 
  CheckCheck, 
  Unplug,
  Info,
  Clock
} from 'lucide-react';
import Image from 'next/image';
require('@solana/wallet-adapter-react-ui/styles.css');
import "@/app/globals.css";

// Types
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
  contributionAmount: string;
}

interface WhitelistStatus {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MIN_CONTRIBUTION = 0.1;
const MAX_CONTRIBUTION = 20;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'; // Replace with your Google Form URL

// Set the whitelist end date and time - modify as needed
const WHITELIST_END_DATE = new Date('2025-06-01T23:59:59');

const WhitelistWrapper = () => {
  // Set up Solana network configuration
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WhitelistForm />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

// Move component definitions outside the main component to prevent recreation on each render
const CountdownTimerComponent = ({ 
  timeLeft, 
  isWhitelistEnded 
}: { 
  timeLeft: TimeLeft, 
  isWhitelistEnded: () => boolean 
}) => {
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];
  
  if (isWhitelistEnded()) {
    return (
      <div className="bg-red-500/20 p-4 rounded-lg text-center">
        <h3 className="text-xl font-bold text-red-400">Whitelist Registration Closed</h3>
        <p className="text-gray-300 mt-2">The registration period has ended.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock size={16} className="text-purple-400" />
        <span>Whitelist Registration Ends In:</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {timeUnits.map((unit, index) => (
          <div key={index} className="bg-gray-800/80 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-400 mt-1">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CountdownTimer = React.memo(CountdownTimerComponent);

const WalletButtonsComponent = ({ 
  publicKey, 
  disconnect 
}: { 
  publicKey: any, 
  disconnect: () => void 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Wallet size={16} className="text-purple-400" />
        <span>Wallet Connection</span>
      </div>
      <div className="wallet-adapter-button-wrapper">
        <style jsx global>{`
          .wallet-adapter-button {
            width: 100% !important;
            height: 48px !important;
            padding: 0.5rem !important;
            border-radius: 0.5rem !important;
            font-weight: 600 !important;
            font-size: 0.875rem !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
          }
          
          .wallet-adapter-button-trigger {
            background: linear-gradient(to right, rgb(168, 85, 247), rgb(34, 211, 238)) !important;
          }
  
          .wallet-adapter-button-trigger:not([disabled]):hover {
            opacity: 0.9 !important;
          }
  
          .wallet-adapter-button.wallet-adapter-button-trigger:before {
            content: '🔗 ';
          }
        `}</style>
        
        {/* Always show the connect button when not connected */}
        {!publicKey && <WalletMultiButton />}
        
        {/* Always show disconnect button when connected */}
        {publicKey && (
          <button
            onClick={disconnect}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Unplug size={20} />
            Disconnect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

const WalletButtons = React.memo(WalletButtonsComponent);

const FormFieldComponent = ({ 
  icon, 
  label, 
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  readOnly = false,
  min,
  step,
  onCopy,
  isCopied
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  readOnly?: boolean;
  min?: number;
  step?: string;
  onCopy?: () => void;
  isCopied?: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-400 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        min={min}
        step={step}
        className={`w-full bg-gray-700 rounded-lg p-3 border ${
          readOnly ? 'bg-gray-800' : ''
        } border-purple-500/20 focus:border-purple-500 transition-colors ${
          readOnly && name === 'walletAddress' ? 'pr-10' : ''
        }`}
      />
      {readOnly && name === 'walletAddress' && value && onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isCopied ? <CheckCheck size={18} /> : <Copy size={18} />}
        </button>
      )}
    </div>
  </div>
);

const FormField = React.memo(FormFieldComponent);

const StatusMessageComponent = ({ status }: { status: WhitelistStatus }) => {
  if (!status.isSubmitting && !status.isSuccess && !status.isError) return null;
  
  let icon = null;
  let bgColor = '';
  
  if (status.isSubmitting) {
    icon = <Loader2 className="animate-spin" size={20} />;
    bgColor = 'bg-blue-500/20';
  } else if (status.isSuccess) {
    icon = <CheckCircle size={20} />;
    bgColor = 'bg-green-500/20';
  } else if (status.isError) {
    icon = <AlertCircle size={20} />;
    bgColor = 'bg-red-500/20';
  }
  
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg ${bgColor} text-sm`}>
      {icon}
      <span>{status.message}</span>
    </div>
  );
};

const StatusMessage = React.memo(StatusMessageComponent);

const WhitelistForm = () => {
  // Wallet State
  const { wallet, publicKey, disconnect } = useWallet();
  
  // UI State
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Form State
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    walletAddress: '',
    contributionAmount: '',
  });
  
  // Whitelist Status
  const [whitelistStatus, setWhitelistStatus] = useState<WhitelistStatus>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: '',
  });
  
  // Local Storage for Registered Wallets
  const [registeredWallets, setRegisteredWallets] = useState<string[]>([]);
  
  // Calculate time remaining - defined with useCallback to prevent recreation
  const calculateTimeLeft = useCallback(() => {
    const difference = WHITELIST_END_DATE.getTime() - new Date().getTime();
    
    let newTimeLeft = { ...timeLeft };
    
    if (difference > 0) {
      newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      // Whitelist has ended
      newTimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    if (newTimeLeft.days !== timeLeft.days || 
        newTimeLeft.hours !== timeLeft.hours || 
        newTimeLeft.minutes !== timeLeft.minutes || 
        newTimeLeft.seconds !== timeLeft.seconds) {
      setTimeLeft(newTimeLeft);
    }
  }, [timeLeft]);
  
  // Animation and Client-Side Effects - Initial setup
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
    
    // Slight delay to ensure client hydration before showing the UI
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Load registered wallets from localStorage
    const storedWallets = localStorage.getItem('registeredWallets');
    if (storedWallets) {
      setRegisteredWallets(JSON.parse(storedWallets));
    }
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set up countdown timer
  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  
  // Update wallet address when connected
  useEffect(() => {
    if (publicKey) {
      setFormData(prev => ({
        ...prev,
        walletAddress: publicKey.toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        walletAddress: ''
      }));
    }
  }, [publicKey]);

  // Handle Form Input Changes - prevent focus loss by using stable reference functions
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Handle Copy Wallet Address - stable reference
  const handleCopyAddress = useCallback(async () => {
    if (formData.walletAddress) {
      try {
        await navigator.clipboard.writeText(formData.walletAddress);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  }, [formData.walletAddress]);
  
  // Check if wallet is already registered - stable reference
  const isWalletRegistered = useCallback((address: string) => {
    return registeredWallets.includes(address);
  }, [registeredWallets]);
  
  // Generate a unique confirmation code
  const generateConfirmationCode = useCallback(() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }, []);

  // Check if whitelist has ended - stable reference
  const isWhitelistEnded = useCallback(() => {
    return new Date() > WHITELIST_END_DATE;
  }, []);

  const validateContributionAmount = useCallback((value: string): boolean => {
    if (value === '') return true; // Allow empty input during typing
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0 && /^\d*\.?\d{0,4}$/.test(value);
  }, []);

  // Handle Form Submission - stable reference
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Check if whitelist period has ended
      if (isWhitelistEnded()) {
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: 'Whitelist registration period has ended',
        });
        return;
      }
  
      // Form validation
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.walletAddress ||
        !formData.contributionAmount
      ) {
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: 'Please fill in all fields',
        });
        return;
      }
  
      const contributionValue = parseFloat(formData.contributionAmount);
      if (isNaN(contributionValue) || !validateContributionAmount(formData.contributionAmount)) {
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: 'Please enter a valid contribution amount',
        });
        return;
      }
  
      if (contributionValue < MIN_CONTRIBUTION) {
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: `Contribution must be at least ${MIN_CONTRIBUTION} SOL`,
        });
        return;
      }
  
      if (contributionValue > MAX_CONTRIBUTION) {
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: `Contribution cannot exceed ${MAX_CONTRIBUTION} SOL`,
        });
        return;
      }
  
      // Check if wallet is already registered
      if (isWalletRegistered(formData.walletAddress)) {
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: 'This wallet address is already registered',
        });
        return;
      }
  
      // Begin submission
      setWhitelistStatus({
        isSubmitting: true,
        isSuccess: false,
        isError: false,
        message: 'Submitting your registration...',
      });
  
      try {
        // Generate a confirmation code
        const confirmationCode = generateConfirmationCode();
  
        // 1. Submit to Google Form
        const googleFormData = new FormData();
        // Replace with your actual form entry IDs
        googleFormData.append('entry.123456789', formData.firstName);
        googleFormData.append('entry.987654321', formData.lastName);
        googleFormData.append('entry.111111111', formData.email);
        googleFormData.append('entry.222222222', formData.walletAddress);
        googleFormData.append('entry.333333333', formData.contributionAmount);
  
        try {
          await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: googleFormData,
            mode: 'no-cors',
          });
        } catch (error) {
          console.error('Error submitting to Google Form:', error);
          // Continue with the process even if Google Form submission fails
        }
  
        // 2. Send confirmation email using our API endpoint
        const emailResponse = await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            walletAddress: formData.walletAddress,
            contributionAmount: formData.contributionAmount,
            confirmationCode: confirmationCode,
          }),
        });
  
        if (!emailResponse.ok) {
          throw new Error('Failed to send confirmation email');
        }
  
        // Update registered wallets in localStorage
        const updatedWallets = [...registeredWallets, formData.walletAddress];
        localStorage.setItem('registeredWallets', JSON.stringify(updatedWallets));
        setRegisteredWallets(updatedWallets);
  
        // Success state
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: 'Registration successful! Check your email for confirmation.',
        });
  
        // Reset form after success (except wallet address)
        setFormData((prev) => ({
          ...prev,
          firstName: '',
          lastName: '',
          email: '',
          contributionAmount: '',
        }));
      } catch (error) {
        console.error('Error submitting form:', error);
        setWhitelistStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: 'Something went wrong. Please try again.',
        });
      }
    },
    [formData, registeredWallets, isWhitelistEnded, generateConfirmationCode, validateContributionAmount, isWalletRegistered]
  );
  
  // Early return for SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black/50 text-white relative py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12" />
              <h1 className="text-2xl font-bold">Soleer Whitelist Registration</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative py-8"
      style={{ backgroundImage: "url('/images/background/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="Soleer Logo" width={48} height={48} />
            <h1 className="text-2xl font-bold">Soleer Whitelist Registration</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div 
            className={`bg-gray-800/50 p-6 rounded-xl backdrop-blur-md border border-purple-500/20 
              transform transition-all duration-700 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 text-transparent bg-clip-text">
                  Join the Soleer Whitelist
                </h2>
                <p className="text-gray-300 max-w-lg mx-auto">
                  Register to participate in the Soleer public sale. Connect your wallet to get started.
                </p>
              </div>
              
              {/* Countdown Timer */}
              <CountdownTimer 
                timeLeft={timeLeft} 
                isWhitelistEnded={isWhitelistEnded} 
              />
              
              {/* Wallet Button - Always visible */}
              <WalletButtons 
                publicKey={publicKey} 
                disconnect={disconnect} 
              />
              
              {/* Whitelist Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField 
                    icon={<User size={16} className="text-purple-400" />}
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                  <FormField 
                    icon={<User size={16} className="text-purple-400" />}
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
                
                <FormField 
                  icon={<Mail size={16} className="text-purple-400" />}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
                
                <FormField 
                  icon={<Wallet size={16} className="text-purple-400" />}
                  label="Wallet Address"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  placeholder="Connect your wallet to auto-fill"
                  readOnly={!!publicKey}
                  onCopy={handleCopyAddress}
                  isCopied={isCopied}
                />
                
                <FormField 
                  icon={<Coins size={16} className="text-purple-400" />}
                  label={`Contribution Amount (Min: ${MIN_CONTRIBUTION} SOL)`}
                  name="contributionAmount"
                  type="number"
                  value={formData.contributionAmount}
                  onChange={handleInputChange}
                  placeholder="Enter amount in SOL"
                  min={MIN_CONTRIBUTION}
                  step="0.01"
                />
                
                {/* Status Message */}
                <StatusMessage status={whitelistStatus} />
                
                {/* Info Note */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 text-sm">
                  <Info size={20} className="text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-300 font-medium">Important Note:</p>
                    <p className="text-gray-300">
                      After registration, you'll receive a confirmation email with further instructions for the public sale.
                      Each wallet address can only register once.
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!publicKey || whitelistStatus.isSubmitting || isWalletRegistered(formData.walletAddress) || isWhitelistEnded()}
                  className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2
                    ${publicKey && !whitelistStatus.isSubmitting && !isWalletRegistered(formData.walletAddress) && !isWhitelistEnded()
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:opacity-90'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                >
                  {whitelistStatus.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : isWalletRegistered(formData.walletAddress) ? (
                    <>
                      <CheckCircle size={20} />
                      Already Registered
                    </>
                  ) : isWhitelistEnded() ? (
                    'Registration Closed'
                  ) : !publicKey ? (
                    'Connect Wallet First'
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitelistWrapper;