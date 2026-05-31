import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

function AnimatedNumber({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1, ease: 'easeOut' });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

const StatsCard = ({ icon, label, value, gradient, iconColor, delay = 0 }) => {
  return (
    <motion.div
      className={`rounded-2xl p-5 relative overflow-hidden cursor-default`}
      style={{
        background: gradient,
        boxShadow: `0 4px 20px ${iconColor}18`,
      }}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -3, boxShadow: `0 12px 40px ${iconColor}25` }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-20"
        style={{ background: iconColor }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: iconColor + 'CC' }}>
            {label}
          </p>
          <p className="text-3xl font-extrabold" style={{ color: '#020617' }}>
            <AnimatedNumber value={value} />
          </p>
        </div>
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm"
          style={{ background: `${iconColor}20`, color: iconColor }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsCard;

