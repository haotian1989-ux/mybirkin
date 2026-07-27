-- MYBIRKIN 种子数据 - 在 Supabase SQL Editor 中执行

-- ===== 产品 =====
INSERT INTO products (id, name, slug, category, price, description, details, materials, dimensions, colors, images, in_stock, featured, new_arrival) VALUES
('hb-001', 'The Mirage Tote', 'mirage-tote', 'handbags', 1280, 'A sculptural tote inspired by desert dunes. Hand-stitched from Italian full-grain calfskin with a suede-lined interior. The organic silhouette is achieved through a proprietary leather-molding technique, ensuring each piece is unique.',
 '["Italian full-grain calfskin","Suede-lined interior with zip pocket","Magnetic closure","Detachable shoulder strap (110–125 cm)","Brass hardware with 18k gold finish"]',
 'Italian full-grain calfskin, brass hardware, suede lining', '32 × 24 × 14 cm / Handle drop 10 cm',
 '["Noir","Cognac","Ivory"]',
 '["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800","https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800","https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800"]',
 true, true, true),

('hb-002', 'The Serpentine Clutch', 'serpentine-clutch', 'handbags', 860, 'An evening clutch with a fluid, wave-like top edge. Crafted from patent calfskin with a polished python-embossed panel. Opens to reveal a blush silk interior.',
 '["Patent calfskin with embossed panel","Silk interior lining","Push-lock closure","Optional chain strap"]',
 'Patent calfskin, silk lining, gold-tone hardware', '22 × 14 × 5 cm',
 '["Onyx","Ruby","Sapphire"]',
 '["https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800","https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800"]',
 true, true, false),

('hb-003', 'The Aria Shoulder Bag', 'aria-shoulder-bag', 'handbags', 980, 'A crescent-shaped shoulder bag that effortlessly transitions from day to night. The soft, slouchy body is counterbalanced by structured top handles. Features our signature hand-burnished edges.',
 '["Soft pebbled calfskin","Cotton twill interior","Double top handles + crossbody strap","Hand-burnished edges"]',
 'Pebbled calfskin, cotton twill, palladium hardware', '28 × 20 × 10 cm / Strap 105–120 cm',
 '["Taupe","Burgundy","Forest"]',
 '["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"]',
 true, false, true),

('hb-004', 'The Nomad Backpack', 'nomad-backpack', 'handbags', 1480, 'A spacious yet refined backpack for the modern explorer. Roll-top closure with bridle leather straps. Padded laptop compartment fits up to 16-inch devices.',
 '["Full-grain bridle leather","Roll-top with magnetic + buckle closure","Padded 16-inch laptop sleeve","External zip pocket","Adjustable padded straps"]',
 'Bridle leather, brass hardware, cotton-canvas lining', '40 × 30 × 15 cm / 50 cm extended',
 '["Tobacco","Black"]',
 '["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800","https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800"]',
 true, true, false),

('ch-001', 'Equestrian Tassel Charm', 'equestrian-tassel-charm', 'charms', 180, 'A playful tassel charm crafted from the same leathers as our handbags. Detachable brass clip attaches to any bag handle or D-ring. Each tassel is hand-cut and finished with a polished edge.',
 '["Hand-cut leather tassels","Brass clip with gold finish","Compatible with all MYBIRKIN bags"]',
 'Calfskin leather, brass hardware', '18 cm total length',
 '["Noir","Cognac","Ivory","Ruby"]',
 '["https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800"]',
 true, true, false),

('ch-002', 'Mini Silk Knot Charm', 'mini-silk-knot-charm', 'charms', 120, 'A delicate knotted silk cord charm with a miniature leather tag debossed with our monogram. Adds a subtle pop of color to any bag.',
 '["Silk cord with leather tag","Debossed monogram","Brass lobster clasp"]',
 'Silk cord, calfskin tag, brass hardware', '15 cm total length',
 '["Blush","Sage","Midnight"]',
 '["https://images.unsplash.com/photo-1608236415053-3691791ac335?w=800"]',
 true, false, true),

('pt-001', 'Luxe Leather Dog Collar', 'luxe-dog-collar', 'pet', 220, 'A refined dog collar made from our signature full-grain leather. Padded interior for comfort, with solid brass hardware. Available in three sizes.',
 '["Full-grain Italian leather","Padded suede interior","Solid brass D-ring and buckle","Hot-stamp personalization available","Three sizes: S (30–38 cm), M (38–48 cm), L (48–58 cm)"]',
 'Italian full-grain leather, brass hardware, suede padding', 'Width 2.5 cm / S: 30–38, M: 38–48, L: 48–58 cm',
 '["Noir","Cognac","Burgundy"]',
 '["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800","https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800"]',
 true, true, true),

('pt-002', 'Braided Leather Leash', 'braided-leather-leash', 'pet', 260, 'A hand-braided leather leash that pairs perfectly with our Luxe Dog Collar. The four-strand round braid provides a comfortable grip.',
 '["Four-strand hand-braided leather","Solid brass trigger snap","Comfortable round grip profile","Matches all collar colors"]',
 'Italian full-grain leather, brass hardware', '120 cm length / 1.5 cm diameter',
 '["Noir","Cognac","Burgundy"]',
 '["https://images.unsplash.com/photo-1568572933382-74d440642117?w=800"]',
 true, false, false),

('pt-003', 'Leather Pet Harness', 'leather-pet-harness', 'pet', 340, 'An elegant step-in harness crafted from soft full-grain leather. Padded chest plate ensures comfort during long walks.',
 '["Soft full-grain leather","Padded chest plate","Adjustable neck and chest straps","Brass D-rings front and back","Step-in design"]',
 'Full-grain leather, brass hardware, neoprene padding', 'S: chest 40–50 / M: chest 50–65 / L: chest 65–80 cm',
 '["Noir","Cognac"]',
 '["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"]',
 true, true, false);

-- ===== Builder: 皮料 =====
INSERT INTO builder_leathers (id, name, hermes_equivalent, grain, characteristics, best_for, image) VALUES
('togo', 'Togo', 'Togo', 'pebbled', 'Soft, lightweight calfskin with a fine, even grain. Resilient and scratch-resistant. The most popular choice for everyday bags.', 'Totes, shoulder bags, everyday pieces', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=85'),
('epsom', 'Epsom', 'Epsom', 'textured', 'Embossed calfskin with a rigid structure. Holds its shape beautifully. Lightweight and rain-resistant.', 'Structured bags, clutches, pieces that need to hold form', 'https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=400&q=85'),
('clemence', 'Clemence', 'Clémence', 'pebbled', 'Bullcalf with a larger, flatter grain than Togo. Supple with a beautiful slouch. Develops a rich patina over time.', 'Slouchy totes, backpacks, relaxed silhouettes', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=85'),
('swift', 'Swift', 'Swift', 'smooth', 'Extremely soft calfskin with a fine grain and subtle sheen. Takes color vibrantly. Luxuriously supple.', 'Clutches, evening bags, pieces that showcase color', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=85'),
('box', 'Box Calf', 'Box', 'smooth', 'Smooth, glossy calfskin with a mirror-like finish. The most formal and traditional leather. Scratches develop into a beautiful patina.', 'Formal handbags, briefcases, heirloom pieces', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=85'),
('barenia', 'Barenia', 'Barenia', 'matte', 'Smooth natural calfskin with a matte finish. Absorbs oils and develops a deep, personal patina unique to each owner.', 'Heritage pieces, bags meant to be passed down', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=85');

-- ===== Builder: 颜色 =====
INSERT INTO builder_colors (id, name, hex) VALUES
('noir', 'Noir', '#1A1A1A'),
('gold-tan', 'Gold', '#C8913A'),
('etoupe', 'Étoupe', '#9C9583'),
('etain', 'Étain', '#6B6B6B'),
('rouge-h', 'Rouge H', '#722F37'),
('bleu-nuit', 'Bleu Nuit', '#1C2833'),
('craie', 'Craie', '#F5F0E8'),
('vert-cypres', 'Vert Cypres', '#2E4A3A'),
('prune', 'Prune', '#4A2545'),
('orange-h', 'Orange H', '#D4722A');

-- ===== Builder: 五金 =====
INSERT INTO builder_hardware (id, name, material, hex, description, price) VALUES
('gold', '18k Gold', 'Brass, 18k Gold-Plated', '#C8A96E', 'Warm, luminous. Our signature finish.', 0),
('palladium', 'Palladium', 'Brass, Palladium-Plated', '#C0C0C0', 'Cool, modern silver tone.', 0),
('rose-gold', 'Rose Gold', 'Brass, Rose Gold-Plated', '#B76E79', 'Soft, romantic warmth.', 30),
('gunmetal', 'Gunmetal', 'Brass, Black Oxide', '#3A3A3A', 'Dark and architectural.', 30),
('permabrass', 'Permabrass', 'Brass, Permabrass-Coated', '#D4A853', 'Durable champagne tone.', 20);

-- ===== Builder: 款型 =====
INSERT INTO builder_silhouettes (id, name, description, dimensions, image, base_price) VALUES
('tote-30', 'The Tote 30', 'Structured tote with magnetic closure. Detachable shoulder strap.', '30cm × 24cm × 14cm · Handle drop 10cm', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=85', 980),
('tote-36', 'The Tote 36', 'Larger tote for everyday. Same structure, more room.', '36cm × 28cm × 16cm · Handle drop 12cm', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=85', 1180),
('shoulder', 'The Shoulder Bag', 'Crescent silhouette. Day to night. Double handles + crossbody strap.', '28cm × 20cm × 10cm · Strap 105-120cm', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=85', 860),
('clutch', 'The Clutch', 'Evening clutch. Wave-edge top. Silk interior. Optional chain.', '22cm × 14cm × 5cm', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=85', 720),
('backpack', 'The Backpack', 'Refined backpack. Roll-top. Padded laptop sleeve.', '40cm × 30cm × 15cm · Fits 16inch laptop', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=85', 1280),
('crossbody', 'The Crossbody', 'Compact, hands-free. Adjustable strap. Multiple compartments.', '22cm × 16cm × 7cm · Strap 95-125cm', 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&q=85', 680);

-- ===== Builder: 工匠 =====
INSERT INTO builder_artisans (id, name, role, years, quote, image) VALUES
('marco', 'Marco Bellini', 'Master Leather Cutter', 28, '"I read the hide before I ever pick up the knife."', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'),
('elena', 'Elena Rossi', 'Master Stitcher', 22, '"Each saddle stitch is a conversation between my hands and the leather."', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'),
('paolo', 'Paolo Conti', 'Edge & Finish Master', 18, '"The edge is where true quality reveals itself. Six layers, no shortcuts."', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'),
('sofia', 'Sofia Bianchi', 'Hardware & Assembly', 15, '"Everything must align. One millimeter off and the whole piece is gone."', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'),
('giovanni', 'Giovanni Ferro', 'Pattern & Design', 25, '"The pattern is the soul of the bag. Every curve, every proportion — intentional."', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face');

-- ===== 工艺页面默认数据 =====
INSERT INTO craft_pages (page, hero_image, hero_tagline, hero_title, intro_text, blocks) VALUES
('overview', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1800&q=85', 'The Atelier', 'Craftsmanship', 'Every MYBIRKIN piece begins and ends with human hands. We believe in radical transparency — showing you exactly where your materials come from, who makes your piece, and how it comes to life.',
 '[
   {"id":"leather","title":"Leather","description":"Full-grain hides from Tuscany''s finest family tanneries. Vegetable-tanned, hand-selected.","image":"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85","videoUrl":""},
   {"id":"hardware","title":"Hardware","description":"Solid brass with hand-applied 18k gold, palladium, and gunmetal finishes.","image":"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85","videoUrl":""},
   {"id":"artisans","title":"Artisans","description":"Meet the hands behind every piece — master leatherworkers with decades of experience.","image":"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=85","videoUrl":""},
   {"id":"process","title":"Process","description":"From sketch to stitch — the 28-step journey of a MYBIRKIN piece.","image":"https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85","videoUrl":""}
 ]'),

('leather', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1800&q=85', 'Materials', 'Our Leather', 'We source exclusively from multigenerational family tanneries in Italy. Each hide is hand-selected for grain consistency, color depth, and character.',
 '[
   {"id":"full-grain","title":"Full-Grain Calfskin","description":"Origin: Tuscany, Italy\nFinish: Vegetable-Tanned\n\nDevelops a rich patina over time.","image":"https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85","videoUrl":""},
   {"id":"pebbled","title":"Pebbled Calfskin","description":"Origin: Veneto, Italy\nFinish: Chrome-Tanned\n\nTextured surface resistant to scratches.","image":"https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=700&q=85","videoUrl":""},
   {"id":"bridle","title":"Bridle Leather","description":"Origin: Tuscany, Italy\nFinish: Hot-Stuffed Vegetable\n\nDense, durable, and ages beautifully.","image":"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=85","videoUrl":""},
   {"id":"patent","title":"Patent Calfskin","description":"Origin: Milan, Italy\nFinish: High-Gloss Lacquer\n\nA mirror-like finish for evening pieces.","image":"https://images.unsplash.com/photo-1591561954557-26941169b49e?w=700&q=85","videoUrl":""}
 ]'),

('hardware', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1800&q=85', 'Details', 'Hardware', 'Every buckle, clasp, and zipper is machined from solid brass in a family-run foundry outside Florence.',
 '[
   {"id":"gold","title":"18k Gold Finish","description":"Solid Brass, 18k Gold-Plated\n\nWarm and luminous. Our signature finish.","image":"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=85","videoUrl":""},
   {"id":"palladium","title":"Palladium","description":"Solid Brass, Palladium-Plated\n\nCool, silvery-white tone. Hypoallergenic and tarnish-resistant.","image":"https://images.unsplash.com/photo-1608236415053-3691791ac335?w=700&q=85","videoUrl":""},
   {"id":"gunmetal","title":"Gunmetal","description":"Solid Brass, Black Oxide\n\nDark and architectural.","image":"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&q=85","videoUrl":""}
 ]'),

('artisans', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85', 'People', 'Our Artisans', 'Four artisans. Every piece passes through all four hands.',
 '[
   {"id":"marco","title":"Marco Bellini","description":"Master Leather Cutter · 28 years\n\n\"The first cut sets the tone for everything.\"","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face","videoUrl":""},
   {"id":"elena","title":"Elena Rossi","description":"Master Stitcher · 22 years\n\n\"A saddle stitch cannot be faked by a machine.\"","image":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face","videoUrl":""},
   {"id":"paolo","title":"Paolo Conti","description":"Edge & Finish Specialist · 18 years\n\n\"The edge is where true quality reveals itself.\"","image":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face","videoUrl":""},
   {"id":"sofia","title":"Sofia Bianchi","description":"Hardware & Assembly · 15 years\n\n\"Setting the hardware is the final act.\"","image":"https://images.unsplash.com/photo-1438761681033-6461ad8d80?w=400&h=500&fit=crop&crop=face","videoUrl":""}
 ]'),

('process', 'https://images.unsplash.com/photo-1523287562758-26cd0b08580a?w=1800&q=85', 'The Journey', 'Our Process', '',
 '[
   {"id":"01","title":"Design & Pattern","description":"Every piece begins as a sketch. Our designer translates your vision into a precise pattern.","image":"","videoUrl":""},
   {"id":"02","title":"Hide Selection","description":"Marco inspects each hide under natural light, marking sections with the best grain, density, and character.","image":"","videoUrl":""},
   {"id":"03","title":"Cutting","description":"Using hand-forged knives, Marco cuts each panel following the pattern. Just a steady hand and decades of experience.","image":"","videoUrl":""},
   {"id":"04","title":"Edge Preparation","description":"Raw edges are beveled, sanded, and dyed. Paolo begins the six-layer edge painting process.","image":"","videoUrl":""},
   {"id":"05","title":"Assembly & Stitching","description":"Elena saddle-stitches every seam by hand. A single bag can take 8-12 hours of stitching alone.","image":"","videoUrl":""},
   {"id":"06","title":"Hardware Setting","description":"Sofia installs each piece of brass hardware with surgical precision.","image":"","videoUrl":""},
   {"id":"07","title":"Final Quality Check","description":"The completed piece is inspected under magnification. Nothing escapes scrutiny.","image":"","videoUrl":""},
   {"id":"08","title":"Packaging & Shipment","description":"Your piece is wrapped in unbleached cotton, placed in a handcrafted box, and shipped to your door.","image":"","videoUrl":""}
 ]');
