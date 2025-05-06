"use client";
import React, { useState, useEffect, useMemo } from 'react';
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
  Info
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

const MIN_CONTRIBUTION = 0.1;
const MAX_CONTRIBUTION = 20;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'; // Replace with your Google Form URL

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

const WhitelistForm = () => {
  // Wallet State
  const { wallet, publicKey, disconnect } = useWallet();
  
  // UI State
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
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
  
  // Animation and Client-Side Effects
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
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

  // Handle Form Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for contribution amount
    if (name === 'contributionAmount') {
      // Allow empty string or valid numbers with up to 4 decimal places
      if (value === '' || /^\d*\.?\d{0,4}$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle Copy Wallet Address
  const handleCopyAddress = async () => {
    if (formData.walletAddress) {
      try {
        await navigator.clipboard.writeText(formData.walletAddress);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };
  
  // Check if wallet is already registered
  const isWalletRegistered = (address: string) => {
    return registeredWallets.includes(address);
  };
  
  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.walletAddress || !formData.contributionAmount) {
      setWhitelistStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Please fill in all fields',
      });
      return;
    }
    
    const contributionValue = parseFloat(formData.contributionAmount);
    if (isNaN(contributionValue) || contributionValue < MIN_CONTRIBUTION) {
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
      // In a real implementation, you would:
      // 1. Submit data to your Google Form
      // 2. Send confirmation email
      // For this demo, we'll simulate the API call with a timeout
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      setFormData(prev => ({
        ...prev,
        firstName: '',
        lastName: '',
        email: '',
        contributionAmount: '',
      }));
      
      // In a real implementation, here you would:
      // 1. Make a POST request to your Google Form
      // const formData = new FormData();
      // formData.append('entry.123456789', formData.firstName); // Replace with your actual form entry IDs
      // formData.append('entry.987654321', formData.lastName);
      // ...
      // await fetch(GOOGLE_FORM_URL, {
      //   method: 'POST',
      //   body: formData,
      //   mode: 'no-cors'
      // });
      
      // 2. Make a request to your email service to send confirmation email
      // This would typically be done via a serverless function or API route
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setWhitelistStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Something went wrong. Please try again.',
      });
    }
  };
  
  // Modified WalletMultiButton wrapper
  const CustomWalletButton = () => {
    const { connected } = useWallet();
    
    return (
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
            content: '${connected ? '' : '🔗 '}';
          }
  
          .wallet-adapter-button-disconnect {
            background: rgb(239 68 68 / 0.8) !important;
            color: white !important;
          }
  
          .wallet-adapter-button-disconnect:hover {
            background: rgb(239 68 68) !important;
          }
  
          .wallet-adapter-button-disconnect:before {
            content: '🔓';
            margin-right: 0.5rem;
          }
  
          .wallet-adapter-button-disconnect span {
            display: inline !important;
            visibility: visible !important;
          }
        `}</style>
        {!wallet ? (
          <WalletMultiButton />
        ) : (
          <button
            onClick={disconnect}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Unplug size={20} />
            Disconnect Wallet
          </button>
        )}
      </div>
    );
  };
  
  // Form Input Field Component
  const FormField = ({ 
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
        {readOnly && name === 'walletAddress' && value && (
          <button
            type="button"
            onClick={handleCopyAddress}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            {isCopied ? <CheckCheck size={18} /> : <Copy size={18} />}
          </button>
        )}
      </div>
    </div>
  );
  
  // Status Message Component
  const StatusMessage = ({ status }: { status: WhitelistStatus }) => {
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
              
              {/* Connect Wallet Button */}
              {!publicKey && (
                <div className="my-8">
                  <CustomWalletButton />
                </div>
              )}
              
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
                  disabled={!publicKey || whitelistStatus.isSubmitting || isWalletRegistered(formData.walletAddress)}
                  className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2
                    ${publicKey && !whitelistStatus.isSubmitting && !isWalletRegistered(formData.walletAddress)
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