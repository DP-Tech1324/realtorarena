
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Save, Eye } from 'lucide-react';

const EmbedManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("https://jigarpatel.royallepage.ca/index.php?advanced=1");
  const [iframeHeight, setIframeHeight] = useState("1200");
  const [iframeSandbox, setIframeSandbox] = useState("allow-scripts allow-forms");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [customEmbedCode, setCustomEmbedCode] = useState("");
  const { toast } = useToast();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    
    checkAdminStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  // If not admin, redirect
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin" />;
  }
  
  const handleSaveRoyalLePage = () => {
    // In a real app, this would save to a database
    // For now, we'll just show a success message
    toast({
      title: "Settings Saved",
      description: "Royal LePage iframe settings have been updated."
    });
  };
  
  const handleSaveCustomEmbed = () => {
    // In a real app, this would save to a database
    toast({
      title: "Custom Embed Saved",
      description: "Your custom embed code has been saved."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Embed Management" 
          subtitle="Configure website embeds and iframe content"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="royallepage" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="royallepage">Royal LePage Listings</TabsTrigger>
              <TabsTrigger value="custom">Custom Embed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="royallepage">
              <Card>
                <CardHeader>
                  <CardTitle>Royal LePage Iframe Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Iframe URL</label>
                      <Input 
                        value={iframeUrl}
                        onChange={(e) => setIframeUrl(e.target.value)}
                        placeholder="Enter the URL for the iframe"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Iframe Height (pixels)</label>
                      <Input 
                        value={iframeHeight}
                        onChange={(e) => setIframeHeight(e.target.value)}
                        type="number"
                        placeholder="Height in pixels"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Sandbox Permissions</label>
                      <Input 
                        value={iframeSandbox}
                        onChange={(e) => setIframeSandbox(e.target.value)}
                        placeholder="e.g., allow-scripts allow-forms"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Space-separated list of permissions (e.g., allow-scripts allow-forms)
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setPreviewVisible(!previewVisible)}
                        className="flex items-center gap-2"
                      >
                        <Eye size={16} />
                        {previewVisible ? "Hide Preview" : "Show Preview"}
                      </Button>
                      
                      <Button 
                        type="button"
                        onClick={handleSaveRoyalLePage}
                        className="bg-realtor-navy hover:bg-realtor-navy/90 flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save Settings
                      </Button>
                    </div>
                    
                    {previewVisible && (
                      <div className="mt-6 border rounded-md p-4">
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                          <iframe
                            src={iframeUrl}
                            width="100%"
                            height={iframeHeight}
                            style={{border: 'none'}}
                            loading="lazy"
                            sandbox={iframeSandbox}
                            title="Royal LePage Listings Preview"
                          />
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="custom">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Embed Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">HTML/Iframe Code</label>
                      <Textarea 
                        value={customEmbedCode}
                        onChange={(e) => setCustomEmbedCode(e.target.value)}
                        placeholder="Paste your custom HTML or iframe code here"
                        className="min-h-[200px] font-mono"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Add any HTML or iframe code that will be displayed in the custom embed area
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setPreviewVisible(!previewVisible)}
                        className="flex items-center gap-2"
                      >
                        <Eye size={16} />
                        {previewVisible ? "Hide Preview" : "Show Preview"}
                      </Button>
                      
                      <Button 
                        type="button"
                        onClick={handleSaveCustomEmbed}
                        className="bg-realtor-navy hover:bg-realtor-navy/90 flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save Embed Code
                      </Button>
                    </div>
                    
                    {previewVisible && customEmbedCode && (
                      <div className="mt-6 border rounded-md p-4">
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                          <div dangerouslySetInnerHTML={{ __html: customEmbedCode }} />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmbedManagement;
