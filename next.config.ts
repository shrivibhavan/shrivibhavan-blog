import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Automatically generate a circular SVG favicon with embedded base64 image data
try {
  const publicDir = path.join(process.cwd(), "public");
  const appDir = path.join(process.cwd(), "app");
  const photoPath = path.join(publicDir, "vibhavan.jpg");
  const iconSvgPath = path.join(appDir, "icon.svg");
  const iconTxtPath = path.join(appDir, "icon.tsx");

  // Clean up icon.tsx to prevent Turbopack compilation errors
  if (fs.existsSync(iconTxtPath)) {
    fs.unlinkSync(iconTxtPath);
    console.log("Successfully deleted app/icon.tsx to prevent build conflicts");
  }

  // Copy Japanese art files from brain artifacts directory to public/art/
  const brainDir = "C:\\Users\\shriv\\.gemini\\antigravity\\brain\\481cfff6-8140-4ee2-8c71-1ae2e65f23e6";
  const publicArtDir = path.join(publicDir, "art");

  if (!fs.existsSync(publicArtDir)) {
    fs.mkdirSync(publicArtDir, { recursive: true });
  }

  const artMappings = [
    { prefix: "japanese_art_mountain_", target: "mountain.png" },
    { prefix: "japanese_art_river_", target: "river.png" },
    { prefix: "japanese_art_shrine_", target: "shrine.png" },
    { prefix: "japanese_art_bamboo_", target: "bamboo.png" },
  ];

  if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir);
    for (const mapping of artMappings) {
      const matchedFile = files.find(f => f.startsWith(mapping.prefix) && f.endsWith(".png"));
      if (matchedFile) {
        const sourcePath = path.join(brainDir, matchedFile);
        const destPath = path.join(publicArtDir, mapping.target);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${matchedFile} to public/art/${mapping.target}`);
      }
    }
  }

  if (fs.existsSync(photoPath)) {
    const imageBuffer = fs.readFileSync(photoPath);
    const base64Image = imageBuffer.toString("base64");
    
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <clipPath id="circleView">
    <circle cx="16" cy="16" r="16" />
  </clipPath>
  <image href="data:image/jpeg;base64,${base64Image}" width="32" height="32" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

    fs.writeFileSync(iconSvgPath, svgContent, "utf8");
    console.log("Successfully generated circular photo favicon inside app/icon.svg");
  }
} catch (error) {
  console.error("Error generating favicon or copying art:", error);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
