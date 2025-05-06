'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';
import "../../app/globals.css";


const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

interface NavItem {
  title: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
  title: string;
  description: string;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, title, description }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const { publicKey, connected, disconnect } = useWallet();
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    const conn = new Connection(clusterApiUrl('devnet'), 'confirmed');
    setConnection(conn);
  }, []);

  useEffect(() => {
    const checkWalletBalance = async () => {
      if (publicKey && connection) {
        try {
          const balance = await connection.getBalance(publicKey);
          setWalletBalance(balance / 1e9);
        } catch (error) {
          console.error('Error fetching balance:', error);
          setWalletBalance(0);
        }
      } else {
        setWalletBalance(0);
      }
    };

    checkWalletBalance();
    const intervalId = setInterval(checkWalletBalance, 30000);

    return () => clearInterval(intervalId);
  }, [publicKey, connection]);

  const shortenAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const WalletDropdown = () => (
    <div className="w-full bg-[#121212] rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{shortenAddress(publicKey?.toString())?.[0]}</span>
          </div>
          <div>
            <div className="text-gray-400 text-sm">{shortenAddress(publicKey?.toString())}</div>
            <div className="text-white text-sm">{walletBalance.toFixed(2)} SOL</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <Link href="/dashboard" className="block">
          <button className="w-full px-4 py-3 text-white hover:bg-gray-800 text-left text-sm uppercase font-medium">
            Dashboard
          </button>
        </Link>
        <Link href="/inbox" className="block">
          <button className="w-full px-4 py-3 text-white hover:bg-gray-800 text-left text-sm uppercase font-medium flex justify-between items-center">
            Inbox
            <span className="bg-red text-white text-xs px-1.5 py-0.5 rounded-full"></span>
          </button>
        </Link>
        <Link href="/profile" className="block">
          <button className="w-full px-4 py-3 text-white hover:bg-gray-800 text-left text-sm uppercase font-medium">
            Complete Profile
          </button>
        </Link>
      </div>

      <div className="border-t border-gray-800">
        <button
          onClick={handleDisconnect}
          className="w-full px-4 py-3 text-white hover:bg-gray-800 text-left text-sm"
        >
          Disconnect
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <nav className="relative">
        <div className="flex justify-between items-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
          <Link href="/" className="flex items-center">
            <Image src="/images/Soleer.png" alt="Soleer logo" width={32} height={32} className="mr-2" />
            <span className="text-2xl font-bold text-white">Soleer</span>
          </Link>

          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-white hover:text-purple-300 text-sm">{item.title}</a>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className="hidden md:block">
            {!connected ? (
              <WalletMultiButtonDynamic className="bg-transparent border border-purple-600 text-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-600 hover:text-white transition-colors duration-300" />
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-transparent border border-purple-600 text-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-600 hover:text-white transition-colors duration-300"
                >
                  <Image src="/images/wallet-icon.png" alt="Wallet" width={16} height={16} />
                  <span>{shortenAddress(publicKey?.toString())}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 z-10">
                    <WalletDropdown />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 p-4">
            {!connected ? (
              <>
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="block py-2 text-sm text-white">{item.title}</a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <WalletMultiButtonDynamic className="w-full bg-transparent border border-purple-600 text-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-600 hover:text-white transition-colors duration-300" />
                </div>
              </>
            ) : (
              <>
                <ul className="space-y-2 mb-4">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="block py-2 text-sm text-white">{item.title}</a>
                    </li>
                  ))}
                </ul>
                <WalletDropdown />
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;