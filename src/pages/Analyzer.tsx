import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Link, AlertTriangle, CheckCircle, XCircle, Info, ArrowLeft, Eye, FileText } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from '@/components/ThemeToggle';

const Analyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const mockResults = {
    score: 85,
    issues: {
      critical: 2,
      serious: 5,
      moderate: 8,
      minor: 12
    },
    details: [
      {
        level: 'critical',
        rule: 'color-contrast',
        description: 'Text contrast is too low',
        element: 'button.primary',
        help: 'Ensure text has sufficient contrast against background colors',
        wcag: 'WCAG 2.1 AA - 1.4.3'
      },
      {
        level: 'serious',
        rule: 'keyboard-navigation',
        description: 'Elements not accessible via keyboard',
        element: 'div.modal',
        help: 'Make sure all interactive elements can be reached with keyboard navigation',
        wcag: 'WCAG 2.1 AA - 2.1.1'
      },
      {
        level: 'moderate',
        rule: 'alt-text',
        description: 'Images missing alternative text',
        element: 'img.hero',
        help: 'Add descriptive alt text to help screen readers understand image content',
        wcag: 'WCAG 2.1 A - 1.1.1'
      }
    ]
  };

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid website URL to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your accessibility report is ready.",
      });
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'serious': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'serious': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <Info className="w-4 h-4" />;
      case 'minor': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <RouterLink to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </RouterLink>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accessibility Analyzer</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* URL Input Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Let's analyze your website
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Enter your website URL and we'll scan it for accessibility issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 py-6 text-lg"
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-medium"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {/* Score Overview */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Accessibility Score
                </CardTitle>
                <div className={`text-6xl font-bold ${getScoreColor(results.score)} mb-4`}>
                  {results.score}
                  <span className="text-2xl text-gray-500">/100</span>
                </div>
                <Progress 
                  value={results.score} 
                  className="h-3 mb-4"
                />
                <CardDescription className="text-lg">
                  {results.score >= 90 && "Excellent! Your site has great accessibility."}
                  {results.score >= 70 && results.score < 90 && "Good progress! A few improvements will make it even better."}
                  {results.score < 70 && "Let's work together to improve your site's accessibility."}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Issues Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {results.issues.critical}
                  </div>
                  <div className="text-sm text-gray-600">Critical Issues</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {results.issues.serious}
                  </div>
                  <div className="text-sm text-gray-600">Serious Issues</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {results.issues.moderate}
                  </div>
                  <div className="text-sm text-gray-600">Moderate Issues</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {results.issues.minor}
                  </div>
                  <div className="text-sm text-gray-600">Minor Issues</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Results */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Detailed Issues
                </CardTitle>
                <CardDescription>
                  Here are the specific accessibility issues we found, with explanations and fixes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.details.map((issue, index) => (
                    <Alert key={index} className="border-l-4 border-l-current">
                      <div className="flex items-start space-x-3">
                        <Badge variant="outline" className={`${getLevelColor(issue.level)} border`}>
                          {getLevelIcon(issue.level)}
                          <span className="ml-1 capitalize">{issue.level}</span>
                        </Badge>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">
                            {issue.description}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Element: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{issue.element}</code>
                          </div>
                          <AlertDescription className="text-gray-700">
                            {issue.help}
                          </AlertDescription>
                          <div className="text-xs text-blue-600 mt-2 font-medium">
                            {issue.wcag}
                          </div>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/simulation">
                <Button variant="outline" size="lg" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
                  <Eye className="w-5 h-5 mr-2" />
                  Test with Simulations
                </Button>
              </RouterLink>
              <RouterLink to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  <FileText className="w-5 h-5 mr-2" />
                  View Dashboard
                </Button>
              </RouterLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
