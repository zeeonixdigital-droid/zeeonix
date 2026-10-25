import { useState, useEffect } from "react";

// Rotating text strings — edit to change the animated words
const words = [
  "Websites",
  "Mobile Apps",
  "Micro SaaS",
  "UGC Ads",
  "Brands",
];

export function TypeAnimation() {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), 50);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <span>
      {words[index].slice(0, charIndex)}
      <span className="inline-block w-0.5 h-[1em] bg-neon-cyan ml-0.5 animate-pulse align-middle" />
    </span>
  );
}
