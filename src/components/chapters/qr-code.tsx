"use client";

import qrcode from "qrcode-generator";
import { useMemo } from "react";

/**
 * A QR code drawn as SVG on the device (qrcode-generator, no network call).
 * Medium error correction survives a creased or slightly smudged poster.
 * Always black on white, whatever the theme, so every phone camera reads it.
 */
export function qrPath(value: string): { size: number; path: string } {
  const qr = qrcode(0, "M");
  qr.addData(value);
  qr.make();
  const count = qr.getModuleCount();
  let path = "";
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) path += `M${col + 4},${row + 4}h1v1h-1z`;
    }
  }
  // Four modules of quiet zone on every side.
  return { size: count + 8, path };
}

export function QrCode({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  const { size, path } = useMemo(() => qrPath(value), [value]);
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} fill="#ffffff" />
      <path d={path} fill="#000000" />
    </svg>
  );
}

/** The same code as a standalone SVG file, for the download button. */
export function qrSvgFile(value: string): string {
  const { size, path } = qrPath(value);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size * 10}" height="${size * 10}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff"/><path d="${path}" fill="#000000"/></svg>`;
}
