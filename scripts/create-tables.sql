-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  specs TEXT,
  price_usd DECIMAL(10,2) NOT NULL,
  price_ars DECIMAL(15,2),
  image_url TEXT,
  download_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  platform VARCHAR(50) NOT NULL,
  video_url TEXT NOT NULL,
  embed_id VARCHAR(255),
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_training table
CREATE TABLE IF NOT EXISTS chat_training (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  website VARCHAR(255),
  business_hours JSONB DEFAULT '{}',
  social_media JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instagram_config table
CREATE TABLE IF NOT EXISTS instagram_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_username VARCHAR(100),
  access_token TEXT,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  posts_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instagram_posts table
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_id VARCHAR(100) UNIQUE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  post_url TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create currency_rates table
CREATE TABLE IF NOT EXISTS currency_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usd_to_ars DECIMAL(10,4) NOT NULL,
  source VARCHAR(100) DEFAULT 'dolarhoy.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password_hash, role) 
VALUES ('admin', 'admin@activatech.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZu', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert default contact info
INSERT INTO contact_info (phone, email, address, city, country, website, business_hours, social_media)
VALUES (
  '+1 (555) 123-4567',
  'info@activatech.com',
  'Av. Tecnología 123',
  'Ciudad de México, México',
  'México',
  'https://activatech.com',
  '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Cerrado"}',
  '{"facebook": "https://facebook.com/activatech", "instagram": "https://instagram.com/activatech", "twitter": "https://twitter.com/activatech", "youtube": "https://youtube.com/@activatech"}'
)
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category, description, specs, price_usd, image_url, download_link) VALUES
('Amplificador Pro X1', 'Amplificadores', 'Amplificador profesional de alta potencia para eventos de gran escala.', 'Potencia: 2000W RMS
Respuesta de frecuencia: 20Hz - 20kHz
THD: <0.1%
Conexiones: XLR, TRS, RCA', 1299.00, '/placeholder.svg?height=300&width=400', '#'),
('Sistema Elite 5.1', 'Sistemas', 'Sistema de sonido surround profesional para instalaciones permanentes.', 'Configuración: 5.1 canales
Potencia total: 3000W
Subwoofer: 12 pulgadas
Satélites: 6.5 pulgadas', 2499.00, '/placeholder.svg?height=300&width=400', '#'),
('Amplificador Digital HD', 'Amplificadores', 'Tecnología digital de última generación con procesamiento DSP integrado.', 'Potencia: 1500W RMS
DSP: 32-bit/96kHz
Ecualización: 31 bandas
Protección: Térmica y cortocircuito', 899.00, '/placeholder.svg?height=300&width=400', '#')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE currency_rates ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now, you can restrict later)
CREATE POLICY "Allow all operations" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON videos FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON chat_training FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON admin_users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON contact_info FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON instagram_config FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON instagram_posts FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON currency_rates FOR ALL USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('instagram-images', 'instagram-images', true);

-- Create storage policies
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow public access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'instagram-images');
CREATE POLICY "Allow public access" ON storage.objects FOR SELECT USING (bucket_id = 'instagram-images');
