import React, { useState, useEffect } from 'react';
import { 
  Book, Layers, Type, CreditCard, 
  LogIn, UserPlus, AlertCircle, CheckCircle2, 
  Loader2, Eye, EyeOff, KeyRound
} from 'lucide-react';

// ==========================================
// 1. COMPONENT LIBRARY (Bootstrap Accessible UI)
// ==========================================

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  fullWidth = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-light border",
    outline: "btn-outline-secondary",
    ghost: "btn-link text-decoration-none text-dark"
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg"
  };

  return (
    <button
      className={`btn d-inline-flex align-items-center justify-content-center fw-medium ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-100' : ''} ${className}`}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={18} className="me-2 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ 
  label, 
  error, 
  helperText, 
  id: providedId, 
  type = 'text',
  className = '',
  required,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalId] = useState(() => providedId || `input-${Math.random().toString(36).substr(2, 9)}`);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label 
          htmlFor={internalId} 
          className="form-label fw-medium text-dark mb-1"
        >
          {label} {required && <span className="text-danger" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="position-relative">
        <input
          id={internalId}
          ref={ref}
          type={inputType}
          className={`form-control ${error ? 'is-invalid' : ''} ${isPassword ? 'pe-5' : ''}`}
          aria-invalid={!!error}
          aria-describedby={
            [
              error ? `${internalId}-error` : null,
              helperText ? `${internalId}-helper` : null
            ].filter(Boolean).join(' ') || undefined
          }
          aria-required={required}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary p-0 me-3 text-decoration-none shadow-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <div className="invalid-feedback d-flex align-items-center mt-1" id={`${internalId}-error`} role="alert">
          <AlertCircle size={14} className="me-1" />
          {error}
        </div>
      )}
      {helperText && !error && (
        <div className="form-text mt-1" id={`${internalId}-helper`}>
          {helperText}
        </div>
      )}
    </div>
  );
});

const Card = ({ children, className = '', ...props }) => (
  <div className={`card shadow-sm border-0 rounded-4 overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

const Alert = ({ children, type = 'info', title, className = '', ...props }) => {
  const styles = {
    info: "alert-info",
    success: "alert-success",
    error: "alert-danger",
    warning: "alert-warning"
  };

  const icons = {
    info: <AlertCircle size={20} />,
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertCircle size={20} />
  };

  return (
    <div className={`alert ${styles[type]} d-flex align-items-start gap-3 border-0 ${className}`} role="alert" {...props}>
      <div className="flex-shrink-0 mt-1">{icons[type]}</div>
      <div>
        {title && <h6 className="alert-heading fw-bold mb-1">{title}</h6>}
        <div className="small mb-0 opacity-75">{children}</div>
      </div>
    </div>
  );
};


// ==========================================
// 2. DEMO APPLICATION (Task Manager Auth Flow)
// ==========================================

const LoginDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // Simulate Django API call
    setTimeout(() => {
      setIsLoading(false);
      const email = e.target.email.value;
      if (email === 'demo@django.com') {
        setSuccess('Successfully authenticated! Redirecting to dashboard...');
      } else {
        setError('Invalid credentials. Hint: use demo@django.com');
      }
    }, 1200);
  };

  return (
    <Card className="mx-auto w-100 p-4 p-sm-5 shadow" style={{ maxWidth: '450px' }}>
      <div className="text-center mb-4">
        <div 
          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary mb-3" 
          style={{ width: '56px', height: '56px' }}
        >
          <LogIn size={28} />
        </div>
        <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
        <p className="text-secondary small">Sign in to your Task Manager account</p>
      </div>

      {error && <Alert type="error" className="mb-4" title="Authentication Error">{error}</Alert>}
      {success && <Alert type="success" className="mb-4" title="Success">{success}</Alert>}

      <form onSubmit={handleSubmit} noValidate>
        <Input 
          label="Email Address" 
          type="email" 
          id="email" 
          name="email" 
          placeholder="you@example.com" 
          required 
        />
        <Input 
          label="Password" 
          type="password" 
          id="password" 
          name="password" 
          placeholder="••••••••" 
          required 
        />
        
        <div className="d-flex align-items-center justify-content-between small mb-4">
          <div className="form-check mb-0">
            <input className="form-check-input" type="checkbox" id="rememberMe" />
            <label className="form-check-label text-secondary" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#" className="text-primary text-decoration-none fw-medium">Forgot password?</a>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <p className="mt-4 text-center small text-secondary mb-0">
        Don't have an account? <a href="#" className="text-primary fw-medium text-decoration-none">Register</a>
      </p>
    </Card>
  );
};

// ==========================================
// 3. STORYBOOK / DOCUMENTATION WRAPPER
// ==========================================

const CodeBlock = ({ code }) => (
  <div className="bg-dark text-light p-3 rounded-3 overflow-auto small font-monospace mt-3">
    <pre className="mb-0"><code>{code.trim()}</code></pre>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('button');

  // Inject Bootstrap CSS into the Canvas environment
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      .animate-spin { animation: spin 1s linear infinite; }
      @keyframes spin { 100% { transform: rotate(360deg); } }
      .hover-bg-light:hover { background-color: #f8f9fa !important; }
      .bg-slate-50 { background-color: #f8fafc; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const navItems = [
    { category: 'components', id: 'button', label: 'Button', icon: Type },
    { category: 'components', id: 'input', label: 'Input', icon: Layers },
    { category: 'components', id: 'alert', label: 'Alert', icon: AlertCircle },
    { category: 'components', id: 'card', label: 'Card', icon: CreditCard },
    { category: 'demo', id: 'login', label: 'Login Flow', icon: LogIn },
    { category: 'demo', id: 'register', label: 'Register Flow', icon: UserPlus },
    { category: 'demo', id: 'reset', label: 'Password Reset', icon: KeyRound },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'button':
        return (
          <div className="d-flex flex-column gap-5">
            <div>
              <h2 className="fw-bold mb-2">Button</h2>
              <p className="text-secondary mb-4">Interactive button component with various states and variants. Highly accessible with ARIA attributes built-in.</p>
              
              <div className="card card-body bg-light border-0 p-4 p-md-5 rounded-4 gap-4">
                <div>
                  <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Variants</h6>
                  <div className="d-flex flex-wrap gap-3">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                  </div>
                </div>

                <div>
                  <h6 className="text-secondary text-uppercase fw-bold mb-3 mt-4" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Sizes</h6>
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h6 className="text-secondary text-uppercase fw-bold mb-3 mt-4" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>States</h6>
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <Button disabled>Disabled State</Button>
                    <Button isLoading>Processing...</Button>
                  </div>
                </div>
              </div>
              
              <CodeBlock code={`
<Button variant="primary" size="lg" isLoading={false}>
  Submit Form
</Button>
              `} />
            </div>
          </div>
        );
        
      case 'input':
        return (
          <div className="d-flex flex-column gap-5">
            <div>
              <h2 className="fw-bold mb-2">Input</h2>
              <p className="text-secondary mb-4">Accessible form inputs with automatic ID generation, label linking, and error states.</p>
              
              <div className="card card-body bg-light border-0 p-4 p-md-5 rounded-4" style={{ maxWidth: '600px' }}>
                <Input 
                  label="Standard Input" 
                  placeholder="Type something..." 
                  helperText="This is a helper text to guide the user."
                />
                
                <Input 
                  label="Password Input" 
                  type="password"
                  placeholder="Enter your password" 
                />

                <Input 
                  label="Input with Error" 
                  defaultValue="invalid_email"
                  error="Please enter a valid email address."
                  className="mb-0"
                />
              </div>
              
              <CodeBlock code={`
<Input 
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error={formErrors.email}
  required
/>
              `} />
            </div>
          </div>
        );

      case 'login':
        return (
          <div>
            <div className="mb-4">
              <h2 className="fw-bold mb-2">Django Auth: Login Integration</h2>
              <p className="text-secondary">A demonstration of the component library composed into a functional authentication view.</p>
            </div>
            <div className="p-4 p-md-5 bg-slate-50 border rounded-4 d-flex align-items-center justify-content-center min-vh-50">
              <LoginDemo />
            </div>
          </div>
        );
        
      case 'register':
        return (
          <div>
            <div className="mb-4">
              <h2 className="fw-bold mb-2">Django Auth: Registration</h2>
            </div>
            <div className="p-4 p-md-5 bg-slate-50 border rounded-4 d-flex align-items-center justify-content-center min-vh-50">
              <Card className="mx-auto w-100 p-4 p-sm-5 shadow" style={{ maxWidth: '450px' }}>
                <div className="text-center mb-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success mb-3"
                    style={{ width: '56px', height: '56px' }}
                  >
                    <UserPlus size={28} />
                  </div>
                  <h3 className="fw-bold text-dark mb-1">Create Account</h3>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-2 mb-2">
                    <div className="col-sm-6"><Input label="First Name" required className="mb-2" /></div>
                    <div className="col-sm-6"><Input label="Last Name" required className="mb-2" /></div>
                  </div>
                  <Input label="Email Address" type="email" required />
                  <Input 
                    label="Password" 
                    type="password" 
                    required 
                    helperText="Must be at least 8 characters long."
                  />
                  <Button type="submit" fullWidth className="mt-3">Register</Button>
                </form>
              </Card>
            </div>
          </div>
        );

      case 'reset':
        return (
           <div>
            <div className="mb-4">
              <h2 className="fw-bold mb-2">Django Auth: Password Reset</h2>
            </div>
            <div className="p-4 p-md-5 bg-slate-50 border rounded-4 d-flex align-items-center justify-content-center min-vh-50">
              <Card className="mx-auto w-100 p-4 p-sm-5 shadow" style={{ maxWidth: '450px' }}>
                <div className="text-center mb-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10 text-warning mb-3"
                    style={{ width: '56px', height: '56px' }}
                  >
                    <KeyRound size={28} />
                  </div>
                  <h3 className="fw-bold text-dark mb-1">Reset Password</h3>
                  <p className="text-secondary small">Enter your email and we'll send you a link to reset your password.</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Input label="Email Address" type="email" required />
                  <Button type="submit" fullWidth className="mt-3 mb-2">Send Reset Link</Button>
                  <Button variant="ghost" fullWidth>Back to Login</Button>
                </form>
              </Card>
            </div>
          </div>
        )
      
      default:
        return <div className="p-4 p-md-5">Select an item from the sidebar.</div>;
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0 bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="row g-0 min-vh-100">
        
        {/* Sidebar (Storybook-style) */}
        <aside className="col-12 col-md-4 col-lg-3 border-end bg-light d-flex flex-column sticky-top" style={{ height: '100vh', zIndex: 1020 }}>
          <div className="p-4 border-bottom bg-white">
            <div className="d-flex align-items-center gap-2 fw-bold fs-5 text-dark">
              <Book size={24} className="text-primary" />
              <span>UI Kit Docs</span>
            </div>
          </div>
          
          <div className="p-4 flex-grow-1 overflow-auto">
            <div className="mb-4">
              <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Components</h6>
              <div className="nav flex-column gap-1">
                {navItems.filter(i => i.category === 'components').map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-2 text-start w-100 border-0 ${
                      activeTab === item.id 
                        ? 'bg-primary bg-opacity-10 text-primary fw-semibold' 
                        : 'text-secondary hover-bg-light'
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-primary' : 'text-secondary opacity-75'} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h6 className="text-secondary text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>App Compositions</h6>
              <div className="nav flex-column gap-1">
                {navItems.filter(i => i.category === 'demo').map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-2 text-start w-100 border-0 ${
                      activeTab === item.id 
                        ? 'bg-primary bg-opacity-10 text-primary fw-semibold' 
                        : 'text-secondary hover-bg-light'
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-primary' : 'text-secondary opacity-75'} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="col-12 col-md-8 col-lg-9 p-4 p-md-5 overflow-auto" style={{ height: '100vh' }}>
          <div className="mx-auto" style={{ maxWidth: '900px' }}>
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
}