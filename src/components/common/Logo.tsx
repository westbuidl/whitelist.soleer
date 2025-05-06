import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo({ width, height }: { width?: number; height?: number }) {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        width={width ? width : 150}
        height={height ? height : 150}
        alt="logo"
        title="logo"
      />
    </Link>
  );
}

export default Logo;
