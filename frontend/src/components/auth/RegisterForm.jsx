import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const InputField = ({ id, label, type = 'text', placeholder, value, onChange, error, icon: Icon }) => {
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPass ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold" style={{ color: '#374151' }}>
        {label}
      </label>
      <div
        className="relative rounded-2xl transition-all duration-200"
        style={{
          background: focused ? '#FFFFFF' : '#F8FAFF',
          border: `2px solid ${error ? '#EF4444' : focused ? '#6366F1' : '#E5E7EB'}`,
          boxShadow: focused ? (error ? '0 0 0 4px rgba(239,68,68,0.1)' : '0 0 0 4px rgba(99,102,241,0.12)') : 'none',
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: focused ? '#6366F1' : '#9CA3AF' }}>
          <Icon size={17} />
        </div>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none pl-11 pr-11 py-3.5 text-sm font-medium"
          style={{ color: '#020617' }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(s => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold"
            style={{ color: showPass ? '#6366F1' : '#9CA3AF' }}
            tabIndex={-1}
          >
            {showPass ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium"
          style={{ color: '#EF4444' }}
        >
          âš  {error}
        </motion.p>
      )}
    </div>
  );
};

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.length < 2) e.name = 'At least 2 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success(`Welcome to SmartNotes Pro, ${form.name.split(' ')[0]}!`);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try again.';
      toast.error(msg);
      setErrors({ email: msg });
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(f => ({ ...f, [field]: '' }));
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'][strength];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#059669'][strength];

  return (
    <motion.div
      className="w-full"
      style={{ maxWidth: 420 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="rounded-3xl p-8 relative"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 20px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute left-8 right-8 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, #8B5CF6, #6366F1, #60A5FA)', top: -1 }}
        />

        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <FiZap size={20} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-lg font-extrabold leading-none" style={{ color: '#020617' }}>SmartNotes Pro</h1>
            <p className="text-xs font-semibold" style={{ color: '#6366F1' }}>Premium Notes Platform</p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold mb-1" style={{ color: '#0F172A' }}>
            Create account
          </h2>
          <p className="text-sm" style={{ color: '#334155' }}>
            Join 10,000+ professionals organizing smarter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
          <InputField
            id="register-name"
            label="Full name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
            icon={FiUser}
          />
          <InputField
            id="register-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set('email')}
            error={errors.email}
            icon={FiMail}
          />
          <InputField
            id="register-password"
            label="Password"
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            icon={FiLock}
          />

          {/* Password strength bar */}
          {form.password && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                    style={{ background: i <= strength ? strengthColor : '#E2E8F0' }} />
                ))}
              </div>
              <p className="text-xs font-semibold" style={{ color: strengthColor }}>
                {strengthLabel} password
              </p>
            </motion.div>
          )}

          <InputField
            id="register-confirm-password"
            label="Confirm password"
            type="password"
            placeholder="Repeat your password"
            value={form.confirmPassword}
            onChange={set('confirmPassword')}
            error={errors.confirmPassword}
            icon={FiLock}
          />

          {/* Submit */}
          <motion.button
            id="register-submit"
            type="submit"
            disabled={loading}
            className="relative w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 mt-1 overflow-hidden"
            style={{
              background: loading
                ? '#A5B4FC'
                : 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
              boxShadow: loading ? 'none' : '0 8px 30px rgba(99,102,241,0.4)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            whileHover={!loading ? { scale: 1.01, boxShadow: '0 12px 40px rgba(99,102,241,0.5)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {!loading && (
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              />
            )}
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating your account...
              </>
            ) : (
              <>
                Create Free Account
                <FiArrowRight size={16} />
              </>
            )}
          </motion.button>

          <p className="text-center text-xs" style={{ color: '#475569' }}>
            By signing up, you agree to our{' '}
            <span className="font-semibold cursor-pointer" style={{ color: '#6366F1' }}>Terms</span> &{' '}
            <span className="font-semibold cursor-pointer" style={{ color: '#6366F1' }}>Privacy Policy</span>
          </p>
        </form>

        <p className="mt-5 text-center text-sm" style={{ color: '#334155' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold transition-colors"
            style={{ color: '#6366F1' }}
          >
            Sign in â†’
          </Link>
        </p>
      </div>

      {/* Trust row */}
      <motion.div
        className="flex items-center justify-center gap-5 mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {['256-bit SSL', 'GDPR Safe', 'Always free'].map(t => (
          <span key={t} className="text-xs font-medium" style={{ color: '#475569' }}>{t}</span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;

