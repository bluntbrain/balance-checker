import { TokenType } from "../utils/types";
import Image from "next/image";

interface TokenLogoProps {
  token: TokenType;
  size?: number;
}

export const TokenLogo = ({ token, size = 24 }: TokenLogoProps) => {
  const logoMap = {
    ETH: "/images/tokens/eth.svg",
    USDC: "/images/tokens/usdc.svg",
    LINK: "/images/tokens/link.svg",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={logoMap[token]}
        alt={`${token} logo`}
        width={size}
        height={size}
        className="rounded-full"
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.style.display = "none";
        }}
      />
    </div>
  );
};
