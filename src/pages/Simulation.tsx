import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, ArrowLeft, Link, RefreshCw } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from '@/components/ThemeToggle';

const visionTypes = [
  { value: 'normal', label: 'Normal Vision', description: 'Standard color vision' },
  { value: 'protanopia', label: 'Protanopia', description: 'Red-blind (1% of men)' },
  { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (1% of men)' },
  { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (very rare)' },
  { value: 'protanomaly', label: 'Protanomaly', description: 'Red-weak (1% of men)' },
  { value: 'deuteranomaly', label: 'Deuteranomaly', description: 'Green-weak (5% of men)' },
  { value: 'tritanomaly', label: 'Tritanomaly', description: 'Blue-weak (rare)' },
  { value: 'achromatopsia', label: 'Achromatopsia', description: 'Complete color blindness' },
];

const Simulation = () => {
  const [url, setUrl] = useState('');
  const [selectedVision, setSelectedVision] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSimulation, setHasSimulation] = useState(false);
  const { toast } = useToast();

  const handleSimulate = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid website URL to simulate.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setHasSimulation(true);
      setIsLoading(false);
      toast({
        title: "Simulation Ready!",
        description: "Your vision simulation is now active.",
      });
    }, 2000);
  };

  const selectedVisionType = visionTypes.find(v => v.value === selectedVision);

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vision Simulation</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Experience your website through different eyes
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              See how your website appears to users with various types of color vision differences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 py-6 text-lg"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSimulate}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5 mr-2" />
                    Simulate
                  </>
                )}
              </Button>
            </div>

            {/* Vision Type Selector */}
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision Type
              </label>
              <Select value={selectedVision} onValueChange={setSelectedVision}>
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Select vision type" />
                </SelectTrigger>
                <SelectContent>
                  {visionTypes.map((vision) => (
                    <SelectItem key={vision.value} value={vision.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{vision.label}</span>
                        <span className="text-sm text-gray-500">{vision.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Vision Information */}
        {selectedVisionType && (
          <Card className="mb-8 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedVisionType.label}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {selectedVisionType.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {selectedVision === 'normal' ? 'Reference' : 'Simulation'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What this means:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedVision === 'normal' && "This shows how your website appears to users with typical color vision."}
                    {selectedVision === 'protanopia' && "Users with protanopia have difficulty distinguishing between red and green colors. Red appears much darker or black."}
                    {selectedVision === 'deuteranopia' && "Users with deuteranopia cannot distinguish between red and green colors. This is the most common form of color blindness."}
                    {selectedVision === 'tritanopia' && "Users with tritanopia have difficulty distinguishing between blue and yellow colors. This is very rare."}
                    {selectedVision === 'protanomaly' && "Users with protanomaly have reduced sensitivity to red light, making red colors appear dimmer."}
                    {selectedVision === 'deuteranomaly' && "Users with deuteranomaly have reduced sensitivity to green light. This affects about 5% of men."}
                    {selectedVision === 'tritanomaly' && "Users with tritanomaly have reduced sensitivity to blue light, making blue colors appear dimmer."}
                    {selectedVision === 'achromatopsia' && "Users with achromatopsia see the world in grayscale, without any color perception."}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Design tips:</h4>
                  <ul className="text-gray-600 space-y-1 list-disc list-inside">
                    {selectedVision === 'normal' && (
                      <>
                        <li>Use this as your baseline reference</li>
                        <li>Ensure good contrast ratios</li>
                        <li>Test with other vision types</li>
                      </>
                    )}
                    {(selectedVision === 'protanopia' || selectedVision === 'deuteranopia' || selectedVision === 'protanomaly' || selectedVision === 'deuteranomaly') && (
                      <>
                        <li>Avoid using red and green together</li>
                        <li>Use patterns or shapes as well as color</li>
                        <li>Choose high contrast color combinations</li>
                      </>
                    )}
                    {(selectedVision === 'tritanopia' || selectedVision === 'tritanomaly') && (
                      <>
                        <li>Avoid relying on blue-yellow distinctions</li>
                        <li>Use high contrast combinations</li>
                        <li>Add visual indicators beyond color</li>
                      </>
                    )}
                    {selectedVision === 'achromatopsia' && (
                      <>
                        <li>Ensure excellent contrast ratios</li>
                        <li>Use textures and patterns</li>
                        <li>Rely on brightness differences</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Simulation Display */}
        {hasSimulation && (
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Simulation Preview
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHasSimulation(false)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              <CardDescription>
                This is how your website appears to users with {selectedVisionType?.label.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Website Simulation
                </h3>
                <p className="text-gray-600 mb-4">
                  Your website would be displayed here with the {selectedVisionType?.label} filter applied.
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Simulating: {selectedVisionType?.label}
                </Badge>
              </div>
              
              {/* Comparison Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">Normal Vision</h4>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="h-32 bg-gradient-to-r from-red-400 via-green-400 to-blue-400 rounded mb-4"></div>
                    <div className="text-sm text-gray-600">Reference view</div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">{selectedVisionType?.label}</h4>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className={`h-32 rounded mb-4 ${
                      selectedVision === 'achromatopsia' ? 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600' :
                      selectedVision.includes('protano') ? 'bg-gradient-to-r from-gray-600 via-green-400 to-blue-400' :
                      selectedVision.includes('deuterano') ? 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400' :
                      selectedVision.includes('tritano') ? 'bg-gradient-to-r from-red-400 via-green-400 to-gray-400' :
                      'bg-gradient-to-r from-red-400 via-green-400 to-blue-400'
                    }`}></div>
                    <div className="text-sm text-gray-600">Simulated view</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <RouterLink to="/analyzer">
            <Button variant="outline" size="lg" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
              Analyze Website
            </Button>
          </RouterLink>
          <RouterLink to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
              View Dashboard
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
