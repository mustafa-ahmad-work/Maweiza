"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SafeImage({
    src,
    alt,
    fill = false,
    width,
    height,
    className = "",
    fallbackComponent = null,
    sizes
}) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return fallbackComponent || null;
    }

    return (
        <Image
            src={src}
            alt={alt || "موعظة"}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            sizes={sizes}
            className={className}
            unoptimized={true}
            onError={() => setHasError(true)}
        />
    );
}
