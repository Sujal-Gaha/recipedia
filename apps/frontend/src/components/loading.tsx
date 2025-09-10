import { motion } from 'framer-motion';
import { ChefHat, Utensils, Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'chef' | 'recipe' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function Loading({ variant = 'chef', size = 'md', text, className, fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const containerClasses = cn(
    'flex flex-col items-center justify-center gap-4',
    fullScreen && 'min-h-screen bg-background',
    className
  );

  const renderSpinner = () => (
    <motion.div
      className={cn('border-4 border-muted border-t-primary rounded-full', sizeClasses[size])}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
    />
  );

  const renderDots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('bg-primary rounded-full', {
            'w-2 h-2': size === 'sm',
            'w-3 h-3': size === 'md',
            'w-4 h-4': size === 'lg',
            'w-5 h-5': size === 'xl',
          })}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn('bg-primary rounded-full', sizeClasses[size])}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    />
  );

  const renderChef = () => (
    <div className="relative">
      <motion.div
        className="relative"
        animate={{
          rotate: [0, -10, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        <ChefHat className={cn('text-primary', sizeClasses[size])} />
      </motion.div>

      {/* Floating utensils */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{
          y: [-2, -6, -2],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.3,
        }}
      >
        <Utensils className="w-4 h-4 text-muted-foreground" />
      </motion.div>

      <motion.div
        className="absolute -bottom-1 -left-2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.6,
        }}
      >
        <Heart className="w-3 h-3 text-red-500" />
      </motion.div>
    </div>
  );

  const renderRecipe = () => (
    <div className="relative">
      {/* Main recipe card */}
      <motion.div
        className={cn(
          'bg-card border rounded-lg p-4 shadow-sm',
          size === 'sm' && 'p-2',
          size === 'lg' && 'p-6',
          size === 'xl' && 'p-8'
        )}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        {/* Recipe lines */}
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 bg-muted rounded"
              style={{ width: `${100 - i * 20}%` }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating stars */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'absolute text-yellow-500',
            i === 0 && '-top-2 -right-1',
            i === 1 && '-top-3 left-2',
            i === 2 && '-bottom-2 -right-2'
          )}
          animate={{
            y: [-1, -4, -1],
            rotate: [0, 180, 360],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4,
          }}
        >
          <Star className="w-3 h-3 fill-current" />
        </motion.div>
      ))}
    </div>
  );

  const renderMinimal = () => (
    <motion.div
      className={cn('bg-primary rounded-full', sizeClasses[size])}
      animate={{
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    />
  );

  const renderVariant = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'chef':
        return renderChef();
      case 'recipe':
        return renderRecipe();
      case 'minimal':
        return renderMinimal();
      default:
        return renderChef();
    }
  };

  return (
    <div className={containerClasses}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderVariant()}
      </motion.div>

      {text && (
        <motion.p
          className={cn('text-muted-foreground font-medium', textSizeClasses[size])}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Specialized loading components for different contexts
export function PageLoading({ text = 'Loading...' }: { text?: string }) {
  return <Loading variant="chef" size="lg" text={text} fullScreen className="bg-background/80 backdrop-blur-sm" />;
}

export function CardLoading({ text }: { text?: string }) {
  return <Loading variant="recipe" size="md" text={text} className="py-8" />;
}

export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return <Loading variant="spinner" size={size} className="inline-flex" />;
}

export function InlineLoading({ text }: { text?: string }) {
  return <Loading variant="dots" size="sm" text={text} className="inline-flex items-center gap-2" />;
}
