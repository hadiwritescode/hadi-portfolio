-- Insert sample services
INSERT INTO public.services (title, description, icon, sort_order) VALUES
  ('Web Development', 'Building modern, responsive websites and web applications using cutting-edge technologies.', 'Code', 1),
  ('UI/UX Design', 'Creating intuitive and visually appealing user interfaces that enhance user experience.', 'Palette', 2),
  ('Mobile Development', 'Developing native and cross-platform mobile applications for iOS and Android.', 'Smartphone', 3),
  ('API Development', 'Designing and implementing robust RESTful and GraphQL APIs for seamless integration.', 'Server', 4);

-- Insert sample projects
INSERT INTO public.projects (title, description, image_url, link, technologies, featured) VALUES
  (
    'E-Commerce Platform',
    'A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/ecommerce',
    ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    true
  ),
  (
    'Task Management App',
    'Collaborative task management tool with real-time updates, team features, and project tracking.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/taskapp',
    ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io'],
    true
  ),
  (
    'Portfolio Website',
    'A stunning portfolio website with smooth animations and interactive elements.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/portfolio',
    ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'],
    false
  ),
  (
    'Social Media Dashboard',
    'Analytics dashboard for managing multiple social media accounts with scheduling features.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/socialdash',
    ARRAY['Vue.js', 'Express', 'Redis', 'PostgreSQL'],
    true
  );
