// app/components/MotionWrappers.tsx
'use client';
import { motion } from 'motion/react';
import { ReactNode } from 'react';
import {
  containerVariants,
  itemVariants,
} from '@/app/constants/motionVariants'; // Ajuste o caminho se necessário

interface WrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function RevealSection({ children, className, id }: WrapperProps) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.section>
  );
}

export function RevealItem({ children, className }: WrapperProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
