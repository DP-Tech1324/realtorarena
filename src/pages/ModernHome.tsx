
import React from 'react';
import ModernHero from '@/components/modern/ModernHero';
import ModernFeaturedProperties from '@/components/modern/ModernFeaturedProperties';
import { useModernProperties } from '@/hooks/useModernProperties';

const ModernHome = () => {
  const {
    featuredProperties,
    loading,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  } = useModernProperties();

  return (
    <div className="min-h-screen">
      <ModernHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <ModernFeaturedProperties
        properties={featuredProperties}
        loading={loading}
      />
    </div>
  );
};

export default ModernHome;
