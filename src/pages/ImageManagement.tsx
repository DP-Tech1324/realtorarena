
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Upload } from 'lucide-react';

const ImageManagement = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{id: string, url: string, property: string}[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  
  // Mock property data - in a real app, this would come from your database
  const properties = [
    { id: '1', title: 'Luxury Villa' },
    { id: '2', title: 'Downtown Apartment' },
    { id: '3', title: 'Suburban House' },
  ];

  // Mock image data - in a real app, this would be fetched from your storage
  useEffect(() => {
    setImages([
      { id: '1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', property: '1' },
      { id: '2', url: 'https://images.unsplash.com/photo-1600573472591-61770e120a4a', property: '2' },
      { id: '3', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', property: '3' },
    ]);
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files || files.length === 0 || !selectedProperty) {
      toast({
        title: "Upload Error",
        description: "Please select a file and property before uploading.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Upload Successful",
        description: `${files.length} image(s) uploaded successfully.`,
      });
      
      // Add mock image to the list
      const newImage = {
        id: Date.now().toString(),
        url: URL.createObjectURL(files[0]),
        property: selectedProperty
      };
      
      setImages(prev => [newImage, ...prev]);
      setFiles(null);
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your image(s).",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setImages(prev => prev.filter(img => img.id !== id));
      
      toast({
        title: "Image Deleted",
        description: "The image was successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the image.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-realtor-navy">Image Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage property images</p>
      </div>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="manage">Manage Images</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="property-select">Select Property</Label>
                  <Select 
                    value={selectedProperty} 
                    onValueChange={setSelectedProperty}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map(property => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload Images</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, GIF. Maximum size: 5MB per image.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-realtor-navy hover:bg-realtor-navy/90"
                  disabled={uploading || !files || !selectedProperty}
                >
                  {uploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Images
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(image => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={image.url}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium">
                    {properties.find(p => p.id === image.property)?.title || 'Unknown property'}
                  </p>
                </CardContent>
              </Card>
            ))}
            
            {images.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No images found. Upload some images to get started.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageManagement;
