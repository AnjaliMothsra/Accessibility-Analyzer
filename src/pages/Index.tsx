import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, FileText, Star, Zap, BarChart3 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { LoginModal } from '@/components/auth/LoginModal';
import { SignUpModal } from '@/components/auth/SignUpModal';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import OptimizedImage from '@/components/OptimizedImage';

const Features = [
  {
    icon: Search,
    title: "WCAG 2.1 Analysis",
    description: "Comprehensive scanning against accessibility guidelines with detailed explanations",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
  },
  {
    icon: Eye,
    title: "Vision Simulation", 
    description: "Experience your site through different types of color blindness and visual impairments",
    color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop"
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Export comprehensive accessibility reports with actionable recommendations",
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
  },
  {
    icon: Star,
    title: "Progress Tracking",
    description: "Monitor your accessibility improvements over time with visual analytics",
    color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop"
  }
];

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Debug logging to track authentication state
  useEffect(() => {
    console.log('Auth state - User:', user, 'Loading:', loading);
  }, [user, loading]);

  useEffect(() => {
    // Check if we should show login modal from navigation state
    if (location.state?.showLogin) {
      setLoginModalOpen(true);
      // Clear the state
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleSignUpClick = () => {
    setSignUpModalOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setLoginModalOpen(false);
    setSignUpModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setSignUpModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleTryDemo = () => {
    // Navigate to analyzer for demo experience
    navigate('/analyzer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Accessibility Analyzer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/analyzer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Analyzer
                </Link>
                <Link to="/simulation" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Simulation
                </Link>
                {!loading && user && (
                  <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center">
                    <BarChart3 className="mr-2 w-4 h-4" />
                    Dashboard
                  </Link>
                )}
              </nav>
              <div className="flex items-center space-x-3">
                {!loading && !user && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 font-medium shadow-sm"
                      onClick={handleTryDemo}
                    >
                      <Zap className="mr-2 w-4 h-4" />
                      Try Free Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLoginClick}
                      className="font-medium border-gray-300 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      Login
                    </Button>
                  </>
                )}
                {!loading && user && (
                  <UserMenu />
                )}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 px-4 py-2 text-sm font-medium shadow-sm">
                ✨ Making the web accessible for everyone
              </Badge>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Create websites that
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                  everyone can use
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                Our advanced accessibility analyzer helps you identify and fix WCAG 2.1 compliance issues, 
                test for color blindness, and ensure your website works beautifully for all users.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                {user ? (
                  <>
                    <Link to="/analyzer">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 py-5 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Start Analyzing
                        <Search className="ml-3 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/dashboard">
                      <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-500 px-10 py-5 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                        View Dashboard
                        <BarChart3 className="ml-3 w-5 h-5" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 py-5 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={handleSignUpClick}
                    >
                      Get Started Free
                      <Search className="ml-3 w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-2 border-gray-300 hover:border-blue-500 px-10 py-5 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={handleLoginClick}
                    >
                      Login
                      <Eye className="ml-3 w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm p-4">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=600&h=400&fit=crop"
                  alt="Person using digital accessibility tools - stylus pen and tablet computer for inclusive design"
                  className="rounded-2xl"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need for web accessibility
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive toolkit makes accessibility testing simple, educational, and actionable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage
                  src={feature.image}
                  alt={`${feature.title} illustration`}
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center leading-relaxed text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1200&h=600&fit=crop"
            alt="Background pattern - person holding illuminated light bulb representing innovation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-bold mb-8">
                Our mission is simple
              </h3>
              <p className="text-xl opacity-95 leading-relaxed mb-10">
                Every person deserves equal access to information and functionality on the web. 
                We're here to help developers create inclusive experiences that work for everyone, 
                regardless of their abilities or the technology they use.
              </p>
              <div className="flex justify-center lg:justify-start">
                {user ? (
                  <Link to="/analyzer">
                    <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-5 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Start Making a Difference
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-5 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleSignUpClick}
                  >
                    Start Making a Difference
                  </Button>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=400&fit=crop"
                  alt="Diverse group of people collaborating around multiple screens - representing inclusive technology and teamwork"
                  className="rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Accessibility Analyzer</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Made with ❤️ for a more accessible web
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      
      <SignUpModal 
        isOpen={signUpModalOpen} 
        onClose={() => setSignUpModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default Index;
