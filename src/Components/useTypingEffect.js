import { useEffect, useState } from 'react';
const useTypingEffect = (text, speed) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    return () => clearInterval(typingInterval);
  }, [text, speed]);
  return displayedText;
};
export default useTypingEffect;