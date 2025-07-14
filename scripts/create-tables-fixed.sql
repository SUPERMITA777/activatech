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
-- Note: In production, use proper password hashing
INSERT INTO admin_users (username, email, password_hash, role) 
VALUES ('admin', 'admin@activatech.com', 'admin123', 'admin')
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
Protección: Térmica y cortocircuito', 899.00, '/placeholder.svg?height=300&width=400', '#'),
('Parlantes Studio Monitor', 'Parlantes', 'Monitores de estudio de referencia para grabación y mezcla profesional.', 'Woofer: 8 pulgadas
Tweeter: 1 pulgada
Respuesta: 35Hz - 22kHz
Potencia: 150W', 649.00, '/placeholder.svg?height=300&width=400', '#'),
('Mezcladora Digital MX-24', 'Mezcladoras', 'Mezcladora digital de 24 canales con efectos integrados.', 'Canales: 24 mono + 4 estéreo
Efectos: Reverb, Delay, Chorus
USB: Grabación multipista
Pantalla: LCD táctil', 1799.00, '/placeholder.svg?height=300&width=400', '#'),
('Subwoofer Activo SW-18', 'Subwoofers', 'Subwoofer activo de 18 pulgadas para graves profundos y potentes.', 'Driver: 18 pulgadas
Potencia: 1000W RMS
Respuesta: 25Hz - 150Hz
Peso: 45kg', 1199.00, '/placeholder.svg?height=300&width=400', '#')
ON CONFLICT DO NOTHING;

-- Insert sample Instagram posts
INSERT INTO instagram_posts (instagram_id, image_url, caption, likes, comments, post_url, timestamp, is_visible) VALUES
('post_1', '/placeholder.svg?height=300&width=300', '🔥 Nuevo amplificador Pro X1 en acción! Potencia profesional para tus eventos más importantes. #ACTIVATECH #AudioProfesional', 245, 18, 'https://instagram.com/p/example1', NOW() - INTERVAL '2 days', true),
('post_2', '/placeholder.svg?height=300&width=300', '✨ Sistema Elite 5.1 instalado en el nuevo estudio de grabación. Calidad de sonido excepcional! 🎵', 189, 12, 'https://instagram.com/p/example2', NOW() - INTERVAL '5 days', true),
('post_3', '/placeholder.svg?height=300&width=300', '🎧 Monitores de estudio en su máximo esplendor. Perfectos para mezcla y masterización profesional.', 156, 9, 'https://instagram.com/p/example3', NOW() - INTERVAL '7 days', true),
('post_4', '/placeholder.svg?height=300&width=300', '🚀 Behind the scenes: Instalación de sistema completo para evento corporativo. #EventosProfesionales', 203, 15, 'https://instagram.com/p/example4', NOW() - INTERVAL '10 days', true)
ON CONFLICT (instagram_id) DO NOTHING;

-- Insert initial currency rate
INSERT INTO currency_rates (usd_to_ars, source, updated_at) 
VALUES (1000.00, 'dolarhoy.com', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample chat training data
INSERT INTO chat_training (question, answer, keywords, category, is_active) VALUES
('¿Cuáles son los precios de los amplificadores?', 'Nuestros amplificadores van desde $899 (Digital HD) hasta $1,299 (Pro X1). Todos incluyen garantía de 2 años.', ARRAY['precio', 'costo', 'amplificador', 'cuanto'], 'Precios', true),
('¿Qué garantía tienen los productos?', 'Todos nuestros productos incluyen garantía de 2 años y soporte técnico especializado. También ofrecemos servicio de instalación.', ARRAY['garantia', 'garantía', 'soporte', 'servicio'], 'Garantía', true),
('¿Cómo puedo contactarlos?', 'Puedes contactarnos al +1 (555) 123-4567 o por email a info@activatech.com. Horario: Lun-Vie 9AM-6PM, Sáb 10AM-4PM.', ARRAY['contacto', 'telefono', 'teléfono', 'email', 'horario'], 'Contacto', true)
ON CONFLICT DO NOTHING;
