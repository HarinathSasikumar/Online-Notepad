import { motion } from 'framer-motion';
import RegisterForm from '../components/auth/RegisterForm';

const benefits = [
  { title: 'Get started instantly', desc: 'No credit card required' },
  { title: 'Secure & private', desc: 'Your data is encrypted' },
  { title: 'Works everywhere', desc: 'Desktop, tablet & mobile' },
  { title: 'Always synced', desc: 'Access from any device' },
];

const particles = [
  { top: '10%', left: '15%', size: 5, delay: 0 },
  { top: '30%', left: '85%', size: 7, delay: 0.6 },
  { top: '60%', left: '8%', size: 4, delay: 1.2 },
  { top: '75%', left: '78%', size: 6, delay: 0.4 },
  { top: '88%', left: '45%', size: 4, delay: 0.9 },
];

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-row-reverse">
      {/* Right panel â€” Dark illustration */}
      <motion.div
        className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0F172A 0%, #1E1B4B 40%, #020617 100%)' }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated blobs */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 280, height: 280, background: 'rgba(99,102,241,0.12)', top: '-60px', right: '-60px' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 200, height: 200, background: 'rgba(139,92,246,0.1)', bottom: 60, left: -40 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 120, height: 120, background: 'rgba(96,165,250,0.08)', top: '45%', right: '15%' }}
          animate={{ scale: [1, 1.25, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: 'rgba(139,92,246,0.5)' }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-10"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#A5B4FC' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Free Forever Plan
          </motion.div>
          <motion.h2
            className="text-4xl font-extrabold leading-tight mb-5 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of<br />
            <span style={{ color: '#A5B4FC' }}>productive professionals</span>
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed max-w-xs"
            style={{ color: 'rgba(148,163,184,0.9)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Create your account and start capturing your best ideas in the most beautiful note-taking app.
          </motion.p>
        </div>

        {/* Benefits grid */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ background: 'rgba(255,255,255,0.09)', scale: 1.02 }}
            >
              <p className="text-white text-sm font-semibold">{b.title}</p>
              <p className="text-xs mt-0.5" style={{ color: '#334155' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          {[
            { num: '10K+', label: 'Active users' },
            { num: '99.9%', label: 'Uptime' },
            { num: '4.9', label: 'Rating' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <p className="text-xl font-extrabold text-white">{s.num}</p>
              <p className="text-xs" style={{ color: '#334155' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Left panel â€” Form */}
      <div
        className="flex-1 flex items-center justify-center p-8 relative overflow-hidden overflow-y-auto"
        style={{ background: 'linear-gradient(135deg, #F0F4FF 0%, #FAFBFF 50%, #F5F0FF 100%)' }}
      >
        {/* Subtle decorations */}
        <div className="absolute top-10 left-10 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: 'rgba(99,102,241,0.05)' }} />
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full pointer-events-none"
          style={{ background: 'rgba(139,92,246,0.04)' }} />

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

