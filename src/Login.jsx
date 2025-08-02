import React, { useState, useEffect } from 'react';
import { MapPin, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Sun, Moon, CheckCircle, AlertCircle, Sparkles, X as XIcon } from 'lucide-react';

// --- Reusable Components ---

const Header = ({ isDarkMode, toggleDarkMode, onBack }) => (
  <header className={`fixed top-0 left-0 w-full z-50 py-4 px-4 sm:px-8 backdrop-blur-lg transition-all duration-300 ${
    isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
  }`}>
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => window.location.href = "/"}
          className={`p-2 rounded-full transition-all cursor-pointer duration-300 ${
            isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            CivicTrack
          </h1>
        </div>
      </div>
      
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition-all duration-300 cursor-pointer`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  </header>
);

const InputField = ({ 
  icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  showPassword, 
  togglePassword,
  isDarkMode,
  required = false
}) => (
  <div className="relative mb-4">
    <div className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
      error 
        ? 'border-red-500 bg-red-50/50' 
        : isDarkMode 
          ? 'border-gray-700 bg-gray-800/50 focus-within:border-orange-500' 
          : 'border-gray-200 bg-white/50 focus-within:border-orange-500'
    }`}>
      <div className={`p-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {icon}
      </div>
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`flex-1 py-3 pr-12 bg-transparent outline-none ${
          isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
        }`}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePassword}
          className={`absolute right-3 p-1 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center mt-2 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </div>
    )}
  </div>
);

const Notification = ({ message, type, onClose, isDarkMode }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? (isDarkMode ? 'bg-green-900' : 'bg-green-100') : (isDarkMode ? 'bg-red-900' : 'bg-red-100');
  const textColor = isSuccess ? (isDarkMode ? 'text-green-300' : 'text-green-800') : (isDarkMode ? 'text-red-300' : 'text-red-800');
  const icon = isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />;

  return (
    <div className={`w-full p-4 rounded-lg flex items-center justify-between mb-6 ${bgColor} ${textColor}`}>
      <div className="flex items-center">
        {icon}
        <span className="ml-3 font-medium">{message}</span>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10">
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};


// --- Form Components ---

const LoginForm = ({ isDarkMode, onSwitchToSignup, onForgotPassword, showNotification }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotification('Login successful!', 'success');
      // In a real app, you would navigate the user away from the login page here.
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Welcome Back</h2>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to continue making your community better</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          icon={<Mail className="w-5 h-5" />}
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          isDarkMode={isDarkMode}
          required
        />
        <InputField
          icon={<Lock className="w-5 h-5" />}
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
          isDarkMode={isDarkMode}
          required
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"/>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remember me</span>
          </label>
          <button type="button" onClick={onForgotPassword} className="text-sm text-orange-500 hover:text-orange-600">Forgot password?</button>
        </div>
        <button type="submit" disabled={isLoading} className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-5 h-5" /></>}
        </button>
        <div className="text-center">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Don't have an account? </span>
          <button type="button" onClick={onSwitchToSignup} className="text-orange-500 hover:text-orange-600 font-semibold">Sign up</button>
        </div>
      </form>
    </div>
  );
};

const SignUpForm = ({ isDarkMode, onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!acceptTerms) newErrors.terms = 'You must accept the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess(formData.firstName);
    }, 1500);
  };

  const passwordStrength = (() => {
    const p = formData.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Create Account</h2>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Join our community and start making a difference</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField icon={<User className="w-5 h-5" />} placeholder="First name" value={formData.firstName} onChange={handleChange('firstName')} error={errors.firstName} isDarkMode={isDarkMode} required />
          <InputField icon={<User className="w-5 h-5" />} placeholder="Last name" value={formData.lastName} onChange={handleChange('lastName')} error={errors.lastName} isDarkMode={isDarkMode} />
        </div>
        <InputField icon={<Mail className="w-5 h-5" />} type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange('email')} error={errors.email} isDarkMode={isDarkMode} required />
        <InputField icon={<Phone className="w-5 h-5" />} type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange('phone')} error={errors.phone} isDarkMode={isDarkMode} />
        <div>
          <InputField icon={<Lock className="w-5 h-5" />} type="password" placeholder="Create password" value={formData.password} onChange={handleChange('password')} error={errors.password} showPassword={showPassword} togglePassword={() => setShowPassword(!showPassword)} isDarkMode={isDarkMode} required />
          {formData.password && (
            <div className="mt-2">
              <div className="flex space-x-1 mb-2">{[...Array(5)].map((_, i) => <div key={i} className={`h-2 flex-1 rounded ${i < passwordStrength ? strengthColors[passwordStrength - 1] : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}/>)}</div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Password strength: <span className={`font-medium ${passwordStrength < 3 ? 'text-red-500' : passwordStrength < 4 ? 'text-yellow-500' : 'text-green-500'}`}>{strengthLabels[passwordStrength - 1] || ''}</span></p>
            </div>
          )}
        </div>
        <InputField icon={<Lock className="w-5 h-5" />} type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange('confirmPassword')} error={errors.confirmPassword} showPassword={showConfirmPassword} togglePassword={() => setShowConfirmPassword(!showConfirmPassword)} isDarkMode={isDarkMode} required />
        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 mt-1"/>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>I agree to the <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a></span>
          </label>
          {errors.terms && <div className="flex items-center mt-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4 mr-1" />{errors.terms}</div>}
        </div>
        <button type="submit" disabled={isLoading} className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Create Account</span><CheckCircle className="w-5 h-5" /></>}
        </button>
        <div className="text-center">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Already have an account? </span>
          <button type="button" onClick={onSwitchToLogin} className="text-orange-500 hover:text-orange-600 font-semibold">Sign in</button>
        </div>
      </form>
    </div>
  );
};

const ForgotPasswordForm = ({ isDarkMode, onBackToLogin, showNotification }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Email is invalid'); return; }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showNotification(`Password reset link sent to ${email}`, 'success');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Forgot Password?</h2>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No worries, we'll send you reset instructions</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField icon={<Mail className="w-5 h-5" />} type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} error={error} isDarkMode={isDarkMode} required />
        <button type="submit" disabled={isLoading} className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Reset Password</span><ArrowRight className="w-5 h-5" /></>}
        </button>
        <button type="button" onClick={onBackToLogin} className={`w-full py-4 rounded-xl font-bold text-lg ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Back to Sign In</button>
      </form>
    </div>
  );
};

// --- Gemini AI Feature Component ---

const PostSignupAssistant = ({ userName, isDarkMode, onComplete }) => {
    const [issueDescription, setIssueDescription] = useState('');
    const [draftedReport, setDraftedReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDraftReport = async () => {
        if (!issueDescription.trim()) {
            setError('Please describe the issue first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setDraftedReport(null);

        const prompt = `An Indian user from Chandigarh is reporting a civic issue. Based on their description, draft a formal, clear, and concise report to be sent to local authorities. The response must be in JSON format. The user's description is: "${issueDescription}"`;
        
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        title: { type: "STRING", description: "A concise title for the report (e.g., 'Large Pothole on Jan Marg Road')." },
                        description: { type: "STRING", description: "A detailed, formal description of the issue, including potential impact." },
                        category: { type: "STRING", description: "A suggested category from options like 'Road Maintenance', 'Streetlight Outage', 'Waste Management', 'Public Safety', 'Water Supply', 'Parks and Recreation'." }
                    },
                    required: ["title", "description", "category"]
                }
            }
        };

        try {
            const apiKey = ""; // API key will be injected by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const result = await response.json();
            
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                setDraftedReport(JSON.parse(text));
            } else {
                throw new Error("Failed to generate report. The model returned an empty response.");
            }

        } catch (err) {
            console.error("Gemini API call failed:", err);
            setError("Sorry, the AI assistant is currently unavailable. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md text-center">
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Welcome, {userName}!</h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Let's get you started. What's one issue in your neighborhood you'd like to fix?</p>
            
            <div className="space-y-4 text-left">
                <textarea
                    value={issueDescription}
                    onChange={(e) => { setIssueDescription(e.target.value); setError(''); }}
                    placeholder="e.g., 'There's a big pothole near the park in Sector 17' or 'The streetlight on my block has been out for a week'"
                    className={`w-full p-3 border-2 rounded-xl h-28 resize-none transition-all duration-300 ${
                        error ? 'border-red-500 bg-red-50/50' : isDarkMode ? 'border-gray-700 bg-gray-800/50 focus:border-orange-500' : 'border-gray-200 bg-white/50 focus:border-orange-500'
                    } ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <button onClick={handleDraftReport} disabled={isLoading} className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Draft with AI ✨</span><Sparkles className="w-5 h-5" /></>}
                </button>

                {draftedReport && (
                    <div className={`mt-6 p-6 rounded-xl text-left ${isDarkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>AI-Generated Draft</h3>
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Title</label>
                                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{draftedReport.title}</p>
                            </div>
                            <div>
                                <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category</label>
                                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{draftedReport.category}</p>
                            </div>
                            <div>
                                <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</label>
                                <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{draftedReport.description}</p>
                            </div>
                        </div>
                         <button onClick={onComplete} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">Submit Report (Demo)</button>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'forgot-password', 'post-signup'
  const [userName, setUserName] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
        const newMode = !prevMode;
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    else setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleSignupSuccess = (name) => {
    setUserName(name);
    setCurrentView('post-signup');
    showNotification(`Welcome to CivicTrack, ${name}!`, 'success');
  };
  
  const handleReportSubmitted = () => {
      showNotification('Your report has been submitted!', 'success');
      setCurrentView('login'); // Or navigate to a dashboard
  }

  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return <SignUpForm isDarkMode={isDarkMode} onSwitchToLogin={() => setCurrentView('login')} onSignupSuccess={handleSignupSuccess} />;
      case 'forgot-password':
        return <ForgotPasswordForm isDarkMode={isDarkMode} onBackToLogin={() => setCurrentView('login')} showNotification={showNotification} />;
      case 'post-signup':
        return <PostSignupAssistant userName={userName} isDarkMode={isDarkMode} onComplete={handleReportSubmitted} />;
      case 'login':
      default:
        return <LoginForm isDarkMode={isDarkMode} onSwitchToSignup={() => setCurrentView('signup')} onForgotPassword={() => setCurrentView('forgot-password')} showNotification={showNotification} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-white to-orange-50'
    }`}>
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        onBack={() => setCurrentView('login')}
      />
      
      <main className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-lg transition-all duration-500 relative ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700/50' 
            : 'bg-white/50 border border-white/20'
        }`}>
          {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} isDarkMode={isDarkMode} />}
          {renderView()}
        </div>
      </main>
    </div>
  );
}
