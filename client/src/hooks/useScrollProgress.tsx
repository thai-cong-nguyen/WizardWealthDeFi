import React, { useState, useEffect } from "react";

const useScrollProgress = (): number => {
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress: number = window.scrollY;
      const scrollHeight: number =
        document.body.scrollHeight - window.innerHeight;

      if (scrollHeight !== 0) {
        // Guard against division by zero
        const numberCompletion: number = Number(
          ((currentProgress / scrollHeight) * 100).toFixed(2)
        );
        setCompletion(numberCompletion);
      }
    };

    // Add scrollHeight to the dependency array
    window.addEventListener("scroll", updateScrollCompletion);

    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []); // Empty dependency array, will run once on component mount

  return completion;
};

export default useScrollProgress;
