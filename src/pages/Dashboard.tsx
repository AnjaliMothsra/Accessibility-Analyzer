
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, TrendingUp, FileText, Download, Share, Calendar, Settings, Plus, ExternalLink, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ThemeToggle from '@/components/ThemeToggle';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [newScanUrl, setNewScanUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleNewScan = async () => {
    if (!newScanUrl) return;
    
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setNewScanUrl('');
      // Navigate to analyzer with the URL
      navigate(`/analyzer?url=${encodeURIComponent(newScanUrl)}`);
    }, 2000);
  };

  const userName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  const mockData = {
    currentScore: 85,
    previousScore: 78,
    trend: '+7',
    totalScans: 12,
    passFailRatio: { passed: 68, failed: 32 },
    recentScans: [
      { 
        id: '1',
        date: '2024-01-15', 
        score: 85, 
        url: 'https://example.com',
        status: 'completed',
        issues: 12,
        passed: 45
      },
      { 
        id: '2',
        date: '2024-01-10', 
        score: 82, 
        url: 'https://example.com/about',
        status: 'completed',
        issues: 15,
        passed: 42
      },
      { 
        id: '3',
        date: '2024-01-05', 
        score: 78, 
        url: 'https://example.com/contact',
        status: 'completed',
        issues: 18,
        passed: 38
      },
    ],
    issuesByCategory: [
      { name: 'Color Contrast', value: 35, color: '#ef4444' },
      { name: 'Keyboard Nav', value: 25, color: '#f97316' },
      { name: 'Alt Text', value: 20, color: '#eab308' },
      { name: 'Form Labels', value: 20, color: '#22c55e' },
    ],
    progressData: [
      { month: 'Oct', score: 65 },
      { month: 'Nov', score: 72 },
      { month: 'Dec', score: 78 },
      { month: 'Jan', score: 85 },
    ],
    wcagCompliance: [
      { level: 'A', current: 85, target: 100 },
      { level: 'AA', current: 72, target: 100 },
      { level: 'AAA', current: 45, target: 80 },
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusIcon = (score) => {
    if (score >= 90) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 70) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <RouterLink to="/">
                <Button variant="ghost" size="lg" className="text-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-700">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </RouterLink>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userName}!
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
              <UserMenu />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Start New Analysis
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Enter a website URL to begin a fresh accessibility scan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="scanUrl" className="sr-only">Website URL</Label>
                <Input
                  id="scanUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={newScanUrl}
                  onChange={(e) => setNewScanUrl(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button 
                onClick={handleNewScan}
                disabled={!newScanUrl || isScanning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
                {isScanning ? 'Scanning...' : 'Analyze Now'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(mockData.currentScore)}`}>
                    {mockData.currentScore}
                  </p>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  mockData.trend.startsWith('+') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {mockData.trend}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Scans</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockData.totalScans}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {mockData.passFailRatio.passed}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Scan</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Today</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scans">Recent Scans</TabsTrigger>
            <TabsTrigger value="insights">Reports & Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Progress Chart */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      Accessibility Progress
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Your accessibility score improvement over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData.progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Issue Distribution */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Issue Categories
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Distribution of accessibility issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockData.issuesByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {mockData.issuesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {mockData.issuesByCategory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scans" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Accessibility Scans
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Your latest website accessibility analysis results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(scan.score)}
                          <div className="font-medium text-gray-900 dark:text-white">
                            {scan.url}
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Scanned on {new Date(scan.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-green-600 dark:text-green-400">
                            {scan.passed} tests passed
                          </span>
                          <span className="text-red-600 dark:text-red-400">
                            {scan.issues} issues found
                          </span>
                        </div>
                      </div>
                      <div className="text-right mr-6">
                        <div className={`text-2xl font-bold ${getScoreColor(scan.score)}`}>
                          {scan.score}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* WCAG Compliance */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  WCAG 2.1 Compliance Progress
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Your progress towards meeting different WCAG conformance levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockData.wcagCompliance.map((level, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                            Level {level.level}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {level.current}% of {level.target}% target
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {level.current}%
                        </span>
                      </div>
                      <Progress value={level.current} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Tests Run</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Average Score</span>
                      <span className="font-semibold text-blue-600">82</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Issues Resolved</span>
                      <span className="font-semibold text-green-600">34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Active Issues</span>
                      <span className="font-semibold text-red-600">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    Improvement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">This Month</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-green-600">+12%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Best Performing</span>
                      <span className="font-semibold">Color Contrast</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Needs Attention</span>
                      <span className="font-semibold text-orange-600">Keyboard Navigation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <RouterLink to="/analyzer">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <FileText className="w-5 h-5 mr-2" />
              New Analysis
            </Button>
          </RouterLink>
          <RouterLink to="/simulation">
            <Button variant="outline" size="lg" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">
              Test Simulations
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
