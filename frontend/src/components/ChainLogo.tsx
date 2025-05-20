import { ChainType } from "../utils/types";
import Image from "next/image";

interface ChainLogoProps {
  chain: ChainType;
  size?: number | "small";
}

export default function ChainLogo({ chain, size = 24 }: ChainLogoProps) {
  const logoMap = {
    ethereum: "/images/chains/ethereum.svg",
    polygon: "/images/chains/polygon.svg",
    arbitrum: "/images/chains/arbitrum.svg",
    base: "/images/chains/base.svg",
    bnb: "/images/chains/bnb.svg",
  };

  // Convert "small" size string to a number
  const pixelSize = size === "small" ? 16 : size;

  return (
    <div className="relative" style={{ width: pixelSize, height: pixelSize }}>
      <Image
        src={logoMap[chain]}
        alt={`${chain} logo`}
        width={pixelSize}
        height={pixelSize}
        className="rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.style.display = "none";
        }}
      />
    </div>
  );
}
