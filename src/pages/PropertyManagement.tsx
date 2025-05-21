
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useProperties, PropertyCreateInput } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Property } from '@/types/Property';
import { Pencil, Trash } from 'lucide-react';

// Form schema for property creation/editing
const propertyFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  price: z.coerce.number().positive('Price must be positive'),
  bedrooms: z.coerce.number().int().positive('Bedrooms must be positive'),
  bathrooms: z.coerce.number().positive('Bathrooms must be positive'),
  squareFeet: z.coerce.number().int().positive('Square feet must be positive'),
  propertyType: z.enum(['house', 'condo', 'townhouse', 'land']),
  status: z.enum(['for-sale', 'for-rent', 'sold', 'pending']),
  featured: z.boolean().default(false),
  description: z.string().optional(),
  images: z.array(z.string()).min(1, 'At least one image is required')
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const PropertyManagement = () => {
  const { useAllProperties, useCreateProperty, useDeleteProperty, useUpdateProperty } = useProperties();
  const { data: properties, isLoading, error } = useAllProperties();
  const createPropertyMutation = useCreateProperty();
  const deletePropertyMutation = useDeleteProperty();
  const updatePropertyMutation = useUpdateProperty();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  
  // Form for adding a new property
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      address: '',
      city: '',
      province: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 0,
      propertyType: 'house',
      status: 'for-sale',
      featured: false,
      description: '',
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3']
    }
  });

  // Form for editing a property
  const editForm = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      address: '',
      city: '',
      province: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 0,
      propertyType: 'house',
      status: 'for-sale',
      featured: false,
      description: '',
      images: ['']
    }
  });

  // Handle property creation
  const handleCreateProperty = (data: PropertyFormValues) => {
    createPropertyMutation.mutate(data as PropertyCreateInput, {
      onSuccess: () => {
        toast({
          title: "Property Created",
          description: "The property has been successfully added to the listing.",
        });
        setIsAddDialogOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error Creating Property",
          description: error.message || "An error occurred while creating the property.",
          variant: "destructive"
        });
      }
    });
  };

  // Handle property deletion
  const handleDeleteProperty = () => {
    if (!activeProperty) return;
    
    deletePropertyMutation.mutate(activeProperty.id, {
      onSuccess: () => {
        toast({
          title: "Property Deleted",
          description: "The property has been successfully removed from the listing.",
        });
        setIsDeleteDialogOpen(false);
        setActiveProperty(null);
      },
      onError: (error) => {
        toast({
          title: "Error Deleting Property",
          description: error.message || "An error occurred while deleting the property.",
          variant: "destructive"
        });
      }
    });
  };

  // Handle property update
  const handleUpdateProperty = (data: PropertyFormValues) => {
    if (!activeProperty) return;
    
    updatePropertyMutation.mutate({
      id: activeProperty.id,
      data: data as PropertyCreateInput
    }, {
      onSuccess: () => {
        toast({
          title: "Property Updated",
          description: "The property details have been successfully updated.",
        });
        setIsEditDialogOpen(false);
        setActiveProperty(null);
      },
      onError: (error) => {
        toast({
          title: "Error Updating Property",
          description: error.message || "An error occurred while updating the property.",
          variant: "destructive"
        });
      }
    });
  };

  // Open edit dialog and populate form with property data
  const openEditDialog = (property: Property) => {
    setActiveProperty(property);
    editForm.reset({
      title: property.title,
      address: property.address,
      city: property.city,
      province: property.province,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet,
      propertyType: property.propertyType,
      status: property.status,
      featured: property.featured,
      description: property.description,
      images: property.images
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (property: Property) => {
    setActiveProperty(property);
    setIsDeleteDialogOpen(true);
  };

  // Function to handle image URLs input
  const handleImagesInput = (e: React.ChangeEvent<HTMLTextAreaElement>, formSetter: any) => {
    const imageUrls = e.target.value.split('\n').filter(url => url.trim() !== '');
    formSetter(imageUrls);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Property Management" 
          subtitle="Add, edit, and remove properties from your listing"
          bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
        />

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-realtor-navy">Property Listings</h2>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy"
              >
                Add New Property
              </Button>
            </div>

            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-600">
                <p>Error loading properties. Please try again later.</p>
              </div>
            )}

            {properties && properties.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableCaption>List of all properties in your database.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Property</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={property.images[0]} 
                              alt={property.title} 
                              className="h-12 w-12 object-cover rounded-md"
                            />
                            <span className="truncate max-w-[180px]">{property.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{`${property.city}, ${property.province}`}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('en-CA', {
                            style: 'currency',
                            currency: 'CAD',
                            maximumFractionDigits: 0,
                          }).format(property.price)}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'for-sale' ? 'bg-green-100 text-green-800' : 
                            property.status === 'for-rent' ? 'bg-blue-100 text-blue-800' :
                            property.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {property.status === 'for-sale' ? 'For Sale' : 
                             property.status === 'for-rent' ? 'For Rent' :
                             property.status === 'sold' ? 'Sold' : 'Pending'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog(property)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500 border-red-200 hover:border-red-500 hover:text-white hover:bg-red-500"
                              onClick={() => openDeleteDialog(property)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              !isLoading && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-500 mb-4">No properties found in the database.</p>
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy"
                  >
                    Add Your First Property
                  </Button>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Add Property Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Enter the details for the new property listing.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateProperty)} className="space-y-6 py-4">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">Basic Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Property title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="1000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Property address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <FormControl>
                            <Input placeholder="Province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="condo">Condo</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="for-sale">For Sale</SelectItem>
                              <SelectItem value="for-rent">For Rent</SelectItem>
                              <SelectItem value="sold">Sold</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="squareFeet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Square Feet</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-realtor-gold focus:ring-realtor-gold border-gray-300 rounded"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Feature this property on the homepage
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a detailed description of the property" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="media" className="space-y-4">
                  <FormItem>
                    <FormLabel>Images URLs (one per line)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                        className="min-h-[150px]"
                        onChange={(e) => handleImagesInput(e, (images: string[]) => 
                          form.setValue('images', images)
                        )}
                        defaultValue={form.getValues('images').join('\n')}
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500 mt-2">
                      Enter each image URL on a new line. At least one image is required.
                    </p>
                    <FormMessage />
                  </FormItem>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy"
                  disabled={createPropertyMutation.isPending}
                >
                  {createPropertyMutation.isPending ? 'Creating...' : 'Create Property'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the details for this property listing.
            </DialogDescription>
          </DialogHeader>
          
          {activeProperty && (
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(handleUpdateProperty)} className="space-y-6 py-4">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="details">Basic Details</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    {/* Same as add form but with editForm */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Property title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={editForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Property address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editForm.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                              <Input placeholder="Province" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                                <SelectItem value="land">Land</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="for-sale">For Sale</SelectItem>
                                <SelectItem value="for-rent">For Rent</SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={editForm.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editForm.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="0.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editForm.control}
                        name="squareFeet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Square Feet</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={editForm.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-realtor-gold focus:ring-realtor-gold border-gray-300 rounded"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Feature this property on the homepage
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter a detailed description of the property" 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="media" className="space-y-4">
                    <FormItem>
                      <FormLabel>Images URLs (one per line)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                          className="min-h-[150px]"
                          onChange={(e) => handleImagesInput(e, (images: string[]) => 
                            editForm.setValue('images', images)
                          )}
                          defaultValue={editForm.getValues('images').join('\n')}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500 mt-2">
                        Enter each image URL on a new line. At least one image is required.
                      </p>
                      <FormMessage />
                    </FormItem>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy"
                    disabled={updatePropertyMutation.isPending}
                  >
                    {updatePropertyMutation.isPending ? 'Updating...' : 'Update Property'}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {activeProperty && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{activeProperty.title}</CardTitle>
                  <CardDescription>{activeProperty.address}, {activeProperty.city}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center">
                    <img 
                      src={activeProperty.images[0]} 
                      alt={activeProperty.title} 
                      className="h-16 w-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="text-realtor-gold font-bold">
                        {new Intl.NumberFormat('en-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          maximumFractionDigits: 0,
                        }).format(activeProperty.price)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activeProperty.bedrooms} bed • {activeProperty.bathrooms} bath • {activeProperty.squareFeet} sqft
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteProperty}
              disabled={deletePropertyMutation.isPending}
            >
              {deletePropertyMutation.isPending ? 'Deleting...' : 'Delete Property'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyManagement;
