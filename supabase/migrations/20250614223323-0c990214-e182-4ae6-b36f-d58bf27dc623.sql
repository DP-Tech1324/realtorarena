
-- Clean up unused tables only
DROP TABLE IF EXISTS realtorjigar_x8d1y_analytics CASCADE;
DROP TABLE IF EXISTS realtorjigar_x8d1y_inquiries CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS contact_requests CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS uploads CASCADE;

-- Update the existing inquiries table to match our new structure
ALTER TABLE public.inquiries 
  ADD COLUMN IF NOT EXISTS inquiry_type TEXT DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add constraints to inquiries if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'inquiries_inquiry_type_check') THEN
    ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_inquiry_type_check 
      CHECK (inquiry_type IN ('general', 'viewing', 'offer', 'information'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'inquiries_status_check') THEN
    ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_status_check 
      CHECK (status IN ('new', 'contacted', 'qualified', 'closed'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'inquiries_priority_check') THEN
    ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_priority_check 
      CHECK (priority IN ('low', 'normal', 'high', 'urgent'));
  END IF;
END $$;

-- Rename listing_id to property_id in inquiries table
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'listing_id') THEN
    ALTER TABLE public.inquiries RENAME COLUMN listing_id TO property_id;
  END IF;
END $$;

-- Create analytics table for tracking
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'inquiry', 'favorite', 'share')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user favorites table
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Enable RLS on new tables
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Analytics policies  
CREATE POLICY "Anyone can create analytics" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view analytics" ON public.analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() 
      AND is_active = true 
      AND role IN ('admin', 'superadmin')
    )
  );

-- User favorites policies
CREATE POLICY "Users can manage their favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Add realtime subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics;

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to inquiries if it doesn't exist
DROP TRIGGER IF EXISTS update_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
