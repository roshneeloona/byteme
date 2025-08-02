import  { useEffect, useRef, useState } from 'react';
import { MapPin, Shield, Zap, Moon, Sun, Menu, X, ArrowRight, Star, Users, CheckCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
const features = [
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: "Instant Reporting",
    description: "Quickly report issues like potholes or broken lights with just a few taps. Your report is sent to local authorities in real-time."
  },
  {
    icon: <MapPin className="w-8 h-8 text-orange-500" />,
    title: "Live Tracking",
    description: "Follow the progress of your report on an interactive map. See when your issue is acknowledged, in progress, and resolved."
  },
  {
    icon: <Shield className="w-8 h-8 text-orange-500" />,
    title: "Community Powered",
    description: "Join your neighbors in making your community better. Upvote existing reports to show their urgency and importance."
  }
];

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 py-4 px-4 sm:px-8 md:px-12 lg:px-24 transition-all duration-300 ${
      scrolled
        ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg shadow-lg`
        : `${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md`
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg transform hover:scale-110 transition-transform duration-300">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} hover:text-orange-500 transition-colors duration-300 cursor-pointer`} >
            CivicVoice
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'} transition-colors duration-300 relative group`}>
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#how-it-works" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'} transition-colors duration-300 relative group`}>
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className={`${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'} transition-colors duration-300 relative group`}>
            Testimonials
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-300 cursor-pointer`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
           onClick={() => window.location.href = "/login"}
           className="hidden md:flex bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer" >
            Get started
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} mt-4 py-4 px-4 rounded-lg shadow-lg`}>
          <a href="#features" className={`block py-2 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'} transition-colors duration-300`}>Features</a>
          <a href="#how-it-works" className={`block py-2 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'} transition-colors duration-300`}>How It Works</a>
          <a href="#testimonials" className={`block py-2 ${isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'} transition-colors duration-300`}>Testimonials</a>
          <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold">
            Download App
          </button>
        </nav>
      </div>
    </header>
  );
};

const Hero = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "50K+", label: "Reports Filed" },
    { number: "15K+", label: "Issues Resolved" },
    { number: "500+", label: "Communities" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const statTimer = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(statTimer);
    };
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden pt-24 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-white to-orange-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse ${
          isDarkMode ? 'bg-orange-500' : 'bg-orange-400'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-10 animate-pulse delay-75 ${
          isDarkMode ? 'bg-orange-600' : 'bg-orange-300'
        }`}></div>
        <div className={`absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-15 animate-bounce ${
          isDarkMode ? 'bg-orange-400' : 'bg-orange-500'
        }`} style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-12 items-center z-10">
        <div className="text-center lg:text-left">
          <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } ${isDarkMode ? 'bg-gray-800 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
            <Star className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">Trusted by 500+ communities</span>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Report Local Issues. <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              See Real Change.
            </span>
          </h1>
          
          <p className={`mt-6 text-lg max-w-lg mx-auto lg:mx-0 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            CivicTrack empowers you to easily report community issues, track their resolution, and build a better neighborhood, together.
          </p>
          
          <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center cursor-pointer">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
           
          </div>

          {/* Animated Stats */}
          <div className={`mt-12 flex justify-center lg:justify-start space-x-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {stats.map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-500 ${
                index === currentStat ? 'scale-110' : 'scale-100'
              }`}>
                <div className={`text-2xl font-bold ${
                  index === currentStat 
                    ? 'text-orange-500' 
                    : isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Hero Visual */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className={`w-96 h-96 rounded-full opacity-20 animate-spin ${
              isDarkMode ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-gradient-to-br from-orange-400 to-orange-600'
            }`} style={{ animationDuration: '20s' }}></div>
            <div className={`absolute top-16 left-16 w-64 h-64 rounded-full opacity-30 animate-pulse ${
              isDarkMode ? 'bg-gradient-to-br from-orange-500 to-orange-700' : 'bg-gradient-to-br from-orange-500 to-orange-700'
            }`}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-2xl animate-bounce`} style={{ animationDuration: '3s' }}>
                <MapPin className="w-16 h-16 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = ({ isDarkMode }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
            });
            observer.unobserve(entry.target); // To prevent re-triggering
          }
        });
      },
      { threshold: 0.3 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section id="features" ref={featuresRef} className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Why Choose CivicTrack?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We've built a platform that's not just about reporting, but about results and community collaboration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-2xl' 
                  : 'bg-orange-50 hover:bg-white shadow-sm hover:shadow-2xl'
              } ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              } p-4 rounded-full inline-block mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {feature.title}
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = ({ isDarkMode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef(null);

  const steps = [
    {
      number: "01",
      title: "Spot an Issue",
      description: "Notice a pothole, broken streetlight, or other community issue that needs attention.",
      // icon: <MapPin className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Take a Photo & Report",
      description: "Open the app, snap a photo, add location details, and submit your report in seconds.",
      // icon: <Zap className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Track Progress",
      description: "Watch as your report gets acknowledged, assigned, and resolved by local authorities.",
      // icon: <Users className="w-6 h-6" />
    },
    {
      number: "04",
      title: "See the Impact",
      description: "Get notified when your issue is fixed and see how you've helped improve your community.",
      // icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="how-it-works" ref={stepsRef} className={`py-20 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Making a difference in your community has never been easier
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-center group cursor-pointer transition-all duration-500 ${
                index === activeStep ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold transition-all duration-500 ${
                index === activeStep
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white scale-110 shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-white text-gray-600 shadow-md'
              }`}>
                <span className="absolute">{step.number}</span>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  index === activeStep ? 'opacity-100' : 'opacity-0'
                }`}>
                  {step.icon}
                </div>
              </div>
              
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                index === activeStep
                  ? 'text-orange-500'
                  : isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {step.title}
              </h3>
              
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ isDarkMode }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Community Member",
      text: "I reported a dangerous pothole on my street and it was fixed within a week! CivicTrack really works and has made our neighborhood so much safer.",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Local Business Owner", 
      text: "The app helped me report broken streetlights that were affecting foot traffic to my store. Great tool that actually gets results!",
      avatar: "MC",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Parent & Resident",
      text: "Love being able to track the progress of issues I report. It's so satisfying to see real change happen in our community.",
      avatar: "ED",
      rating: 5
    },
    {
      name: "David Wilson",
      role: "City Council Member",
      text: "CivicTrack has revolutionized how we receive and process community reports. The efficiency is remarkable.",
      avatar: "DW",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            What People Are Saying
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real stories from community members making a difference
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-orange-50'
          } p-8 md:p-12 rounded-3xl shadow-xl transition-all duration-500`}>
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className={`text-xl md:text-2xl font-medium text-center mb-8 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                {testimonials[currentTestimonial].avatar}
              </div>
              <div className="text-center">
                <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                index === currentTestimonial
                  ? `${isDarkMode ? 'bg-gray-700 shadow-2xl' : 'bg-white shadow-2xl'} scale-105`
                  : `${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'} hover:shadow-lg`
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ isDarkMode }) => (
  <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full animate-pulse delay-75"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
    </div>
    
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to Make a Difference?
      </h2>
      <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
        Join thousands of community members who are already using CivicTrack to improve their neighborhoods
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="group bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
        onClick={() => window.location.href = "/complaint"}>
          Submit a Complaint
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
       
        
      </div>
    </div>
  </section>
);

const Footer = ({ isDarkMode }) => (
  <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white py-16`}>
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg">
              <MapPin className="text-white w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">CivicTrack</h3>
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Empowering communities to create positive change, one report at a time. Join the movement for better neighborhoods.
          </p>
          <div className="flex space-x-4">
            
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full cursor-pointer transition-colors duration-300">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full cursor-pointer transition-colors duration-300">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full cursor-pointer transition-colors duration-300">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
           
            
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-lg">Product</h4>
          <ul className="space-y-3">
            <li><a href="#features" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Features</a></li>
            <li><a href="#how-it-works" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">How It Works</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Pricing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Updates</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">API</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-lg">Company</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Careers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Contact</a></li>
            <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Press</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CivicTrack. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const BackToTop = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      } ${
        isDarkMode 
          ? 'bg-gray-800 text-orange-400 hover:bg-gray-700' 
          : 'bg-white text-orange-500 hover:bg-orange-50'
      } hover:scale-110`}
    >
      <ArrowRight className="w-5 h-5 transform -rotate-90" />
    </button>
  );
};

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply class to body for better global styling control
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero isDarkMode={isDarkMode} />
        <Features isDarkMode={isDarkMode} />
        <HowItWorks isDarkMode={isDarkMode} />
        <Testimonials isDarkMode={isDarkMode} />
        <CTA isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
      <BackToTop isDarkMode={isDarkMode} />
    </div>
  );
}
export default Home;