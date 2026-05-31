import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  icon,
  required = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-900"
        >
          {label}
          {required && <span className="text-indigo-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-base">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`input-base ${icon ? 'pl-10' : ''} ${isPassword ? 'pr-10' : ''} ${error ? 'border-red-400 focus:border-red-400 focus:shadow-none' : ''}`}
          style={error ? { boxShadow: '0 0 0 3px rgba(239,68,68,0.12)' } : {}}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5">
          <span>âš </span> {error}
        </p>
      )}
    </div>
  );
};

export default Input;

