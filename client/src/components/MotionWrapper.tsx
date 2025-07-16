'use client';
import { motion } from 'framer-motion';

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center text-center px-4"
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
