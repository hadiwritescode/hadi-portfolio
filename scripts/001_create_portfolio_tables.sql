-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT,
  technologies TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin_profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Projects policies: Public read, admin write
CREATE POLICY "projects_public_read" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "projects_admin_insert" ON public.projects
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "projects_admin_update" ON public.projects
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "projects_admin_delete" ON public.projects
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Services policies: Public read, admin write
CREATE POLICY "services_public_read" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "services_admin_insert" ON public.services
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "services_admin_update" ON public.services
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "services_admin_delete" ON public.services
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Contact messages policies: Insert for anyone, read/update/delete for admin
CREATE POLICY "contact_messages_public_insert" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "contact_messages_admin_read" ON public.contact_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "contact_messages_admin_update" ON public.contact_messages
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "contact_messages_admin_delete" ON public.contact_messages
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admin profiles policies: Only admins can view admin list
CREATE POLICY "admin_profiles_admin_read" ON public.admin_profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );
