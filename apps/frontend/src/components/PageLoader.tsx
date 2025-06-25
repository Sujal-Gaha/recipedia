import { motion, type Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const PageLoader = () => {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  const loaderVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: 'linear',
      },
    },
  };

  const dotsVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.2, 1, 0.2],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
      },
    },
  };

  const dotTransition = (delay: number) => ({
    delay,
    duration: 1.5,
    repeat: Number.POSITIVE_INFINITY,
    ease: 'easeInOut' as const,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        className="flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div className="relative" variants={loaderVariants} animate="animate">
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>

        <div className="flex gap-1.5 mt-6">
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={dotTransition(0)}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={dotTransition(0.2)}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={dotTransition(0.4)}
          />
        </div>

        <motion.p
          className="text-sm text-muted-foreground mt-4"
          variants={dotsVariants}
          initial="initial"
          animate="animate"
        >
          Loading simulation...
        </motion.p>
      </motion.div>
    </div>
  );
};
