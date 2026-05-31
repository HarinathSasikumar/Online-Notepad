import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';

const features = [
  { text: 'Secure JWT Authentication' },
  { text: 'Color-coded Organization' },
  { text: 'Real-time Search & Filters' },
  { text: 'Pin & Archive Notes' },
];

// Floating particle dots
const particles = [
  { top: '15%', left: '10%', size: 6, delay: 0 },
  { top: '25%', left: '80%', size: 4, delay: 0.5 },
  { top: '55%', left: '5%', size: 8, delay: 1 },
  { top: '70%', left: '85%', size: 5, delay: 1.5 },
  { top: '85%', left: '20%', size: 4, delay: 0.8 },
  { top: '40%', left: '90%', size: 7, delay: 0.3 },
];

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left panel â€” Illustration */}
      <motion.div
        className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #4F46E5 0%, #6366F1 35%, #8B5CF6 65%, #A78BFA 100%)',
        }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 right-0 rounded-full"
          style={{ width: 320, height: 320, background: 'rgba(255,255,255,0.07)', top: '-80px', right: '-80px' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 220, height: 220, background: 'rgba(255,255,255,0.05)', bottom: '-60px', left: '-60px' }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.06)', top: '40%', left: '60%' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-semibold mb-10"
            style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span></span> Premium Notes Platform
          </motion.div>

          <motion.h2
            className="text-4xl font-extrabold text-white leading-tight mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Organize your thoughts,<br />
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>amplify your productivity</span>
          </motion.h2>

          <motion.p
            className="text-base leading-relaxed max-w-xs"
            style={{ color: 'rgba(255,255,255,0.65)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SmartNotes Pro gives you a beautiful, distraction-free space to capture ideas and stay organized.
          </motion.p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.02 }}
            >
              <span className="text-white text-xs font-semibold">{f.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-2">
            {['#F59E0B', '#10B981', '#6366F1', '#EC4899'].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ background: c, zIndex: 4 - i }}>
                {['J', 'S', 'A', 'M'][i]}
              </div>
            ))}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Joined by 10,000+ users</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>4.9 rating</p>
          </div>
        </div>
      </motion.div>

      {/* Right panel â€” Form with rich background */}
      <div
        className="flex-1 flex items-center justify-center p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #F0F4FF 0%, #FAFBFF 50%, #F5F0FF 100%)',
        }}
      >
        {/* Subtle background decorations */}
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full"
          style={{ background: 'rgba(99,102,241,0.06)' }} />
        <div className="absolute bottom-10 left-10 w-28 h-28 rounded-full"
          style={{ background: 'rgba(139,92,246,0.05)' }} />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full"
          style={{ background: 'rgba(96,165,250,0.06)' }} />

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

