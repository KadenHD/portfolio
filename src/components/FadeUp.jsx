import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function FadeUp({
  className,
  children,
  delay = 0,
  duration = 0.8,
  distance = 20,
  direction = "up",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView && !isVisible) {
      const id = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(id);
    }
  }, [isInView, isVisible]);

  const finalDistance = isMobile ? 10 : distance;
  const finalDuration = isMobile ? 0.8 : duration;
  const finalDelay = isMobile ? 0 : delay;

  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "right"
          ? -finalDistance
          : direction === "left"
          ? finalDistance
          : 0,
      y:
        direction === "up"
          ? finalDistance
          : direction === "down"
          ? -finalDistance
          : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ delay: finalDelay, duration: finalDuration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
