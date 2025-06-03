
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus } from 'lucide-react';
import { PropertyForm } from '@/components/property-management/PropertyForm';
import { PropertyGrid } from '@/components/property-management/PropertyGrid';
import { Property } from '@/types/Property';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { transformPropertyFromDb } from '@/lib/utils';

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({ title: "Error loading properties", description: error.message, variant: "destructive" });
      } else {
        // Transform all results to match the Property interface
        setProperties(Array.isArray(data) ? data.map(transformPropertyFromDb) : []);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  // Add or Edit property handler
  const handleSubmit = async (formData: any, coverImage?: File, additionalImages?: string[]) => {
    setIsSubmitting(true);
    try {
      let images: string[] = additionalImages || [];
      let coverImageUrl = editingProperty?.cover_image || '';

      // Handle cover image upload if a new one was selected
      if (coverImage) {
        const ext = coverImage.name.split('.').pop();
        const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const { data, error } = await supabase.storage
          .from('realtorjigar-images')
          .upload(`property-images/${fileName}`, coverImage);

        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from('realtorjigar-images').getPublicUrl(data.path);
        coverImageUrl = publicUrl;
      }

      if (editingProperty) {
        // Update
        const { error, data } = await supabase.from('listings').update({
          ...formData,
          images,
          cover_image: coverImageUrl,
        }).eq('id', editingProperty.id).select();

        if (error) throw error;
        // Use the transformer on the returned object
        setProperties((prev) =>
          prev.map((p) => (p.id === editingProperty.id ? transformPropertyFromDb(data[0]) : p))
        );
        toast({ title: "Property updated" });
      } else {
        // Insert
        const { data, error } = await supabase.from('listings').insert([
          { ...formData, images, cover_image: coverImageUrl }
        ]).select();

        if (error) throw error;
        // Use the transformer on the returned object
        setProperties((prev) => [transformPropertyFromDb(data[0]), ...prev]);
        toast({ title: "Property created" });
      }

      setModalOpen(false);
      setEditingProperty(null);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  // Edit handler
  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', id);
    if (!error) setProperties((prev) => prev.filter((p) => p.id !== id));
    toast({ title: error ? "Delete failed" : "Property deleted", variant: error ? "destructive" : "default" });
  };

  // Toggle status handler
  const handleToggleStatus = async (id: string, currentStatus: 'published' | 'draft') => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const { data, error } = await supabase
      .from('listings')
      .update({ status: newStatus })
      .eq('id', id)
      .select();

    if (!error && data) {
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      toast({ title: `Property marked as ${newStatus}` });
    } else if (error) {
      toast({ title: "Status update failed", description: error.message, variant: "destructive" });
    }
  };

  // Stats
  const total = properties.length;
  const published = properties.filter((p) => p.status === 'published').length;
  const draft = properties.filter((p) => p.status === 'draft').length;
  const featured = properties.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-realtor-navy">Properties Management</h1>
                  <p className="text-gray-600 mt-2">Manage property listings and details</p>
                </div>
                <Button className="bg-realtor-gold hover:bg-realtor-gold/90" onClick={() => { setModalOpen(true); setEditingProperty(null); }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-realtor-gold" />
                      Total
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{total}</div>
                    <p className="text-sm text-muted-foreground">All listings</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-green-500" />
                      Published
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{published}</div>
                    <p className="text-sm text-muted-foreground">Live now</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-yellow-500" />
                      Draft
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{draft}</div>
                    <p className="text-sm text-muted-foreground">Not published</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-500" />
                      Featured
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{featured}</div>
                    <p className="text-sm text-muted-foreground">Special picks</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Property Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <PropertyGrid
                    properties={properties}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    isLoading={loading}
                  />
                </CardContent>
              </Card>

              {/* Modal for Add/Edit */}
              {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
                    <button
                      onClick={() => { setModalOpen(false); setEditingProperty(null); }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                    <PropertyForm
                      onSubmit={handleSubmit}
                      initialData={editingProperty ?? undefined}
                      isSubmitting={isSubmitting}
                      onCancel={() => { setModalOpen(false); setEditingProperty(null); }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProperties;
