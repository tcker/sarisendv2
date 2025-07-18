'use client'
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

type SizeType = 'small' | 'medium' | 'large';

interface UserProfileProps {
  walletAddress?: string;
  profileImage?: string;
  size?: SizeType;
  className?: string;
  disconnectWallet?: () => void;
  isMerchant?: boolean;
}

export default function UserProfile({
  walletAddress = "",
  profileImage = "/logo.png",
  size = "medium",
  className = "",
  disconnectWallet = () => {},
  isMerchant = false,
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(profileImage);

  const sizeClasses: Record<SizeType, { image: string; text: string }> = {
    small: {
      image: "w-8 h-8",
      text: "text-sm",
    },
    medium: {
      image: "w-12 h-12",
      text: "text-lg",
    },
    large: {
      image: "w-16 h-16",
      text: "text-xl",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  const displayName =
    walletAddress && walletAddress.length >= 10
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : "";

  const handleImageError = (): void => {
    setImageSrc("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");
  };

  return (
    <>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-3 hover:opacity-80 transition-opacity z-50 ${className}`}
      >
        <div className={`${currentSize.image} rounded-full overflow-hidden relative`}>
          <Image
            src={imageSrc}
            alt="User profile"
            fill
            className="object-cover"
            onError={handleImageError}
            sizes="(max-width: 768px) 48px, 48px"
          />
        </div>
        <span className={`${currentSize.text} font-medium text-white`}>
          {displayName}
        </span>
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        walletAddress={walletAddress}
        disconnectWallet={disconnectWallet}
        isMerchant={isMerchant}
      />
    </>
  );
}
