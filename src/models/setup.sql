CREATE TABLE organizations (
	organization_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
)

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_projects(
	project_id SERIAL PRIMARY KEY NOT NULL,
	organization_id INT NOT NULL,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(255) NOT NULL,
	date DATE NOT NULL,
	FOREIGN KEY(organization_id) REFERENCES 
	organizations(organization_id)
)

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES (1, 'Argonaut Planter Boxes', 'We will build planter boxes at Argonaut Elementary School.', 'Argonaut Elementary School', '2026-03-24'),
	(1, 'Rinconada Park Fences', 'We will install new fences at Rinconada Park', 'Rinconada Park', '2027-04-23'),
	(1, 'Rinconada Park Playground', 'Building a new playground at Rinconada Park', 'Rinconada Park', '2027-04-23'),
	(1, 'Community Garden Shed', 'We will build a shed for gardening tools at Green Valley Community Garden', 'Green Valley Community Garden', '2026-05-15'),
	(1, 'Local Library Renovation', 'We will renovate the community library to create a better learning space', 'Downtown Public Library', '2026-06-10'),
	(2, 'Urban Farm Workshop', 'We will host a workshop on sustainable farming practices in the city', 'City Hall Community Center', '2026-07-14'),
	(2, 'Pollinator Garden', 'We will plant a pollinator garden to support local bees and butterflies', 'Sunny Meadows Park', '2026-08-20'),
	(2, 'Hydroponic System Installation', 'We will install a hydroponic system at the local high school for educational purposes', 'Lincoln High School', '2026-09-12'),
	(2, 'Community Composting Program', 'We will initiate a composting program to reduce waste and enrich soil', 'City Community Recycling Center', '2026-09-30'),
	(2, 'Farm-to-Table Dinner', 'We will organize a farm-to-table dinner to raise funds and awareness for urban farming', 'Central City Pavilion', '2026-10-25'),
	(3, 'Annual Charity Walk', 'We will organize a charity walk to raise funds for local shelters', 'City Park', '2026-11-05'),
	(3, 'Clothing Drive', 'We will collect and distribute clothing to families in need', 'Community Center', '2026-12-03'),
	(3, 'Food Pantry Setup', 'We will set up a food pantry to support low-income families in our community', 'Local Elementary School', '2027-01-10'),
	(3, 'Book Donation Campaign', 'We will collect and donate books to underprivileged children', 'Local Library', '2027-02-15'),
	(3, 'Toys for Tots Drive', 'We will organize a toy drive to provide gifts for children in need during the holidays', 'City Hall', '2027-03-01');

CREATE TABLE categories (
	categories_id SERIAL PRIMARY KEY NOT NULL,
	c_name VARCHAR(255) NOT NULL
);

CREATE TABLE project_categories (
	project_id INT NOT NULL,
	categories_id INT NOT NULL,
	PRIMARY KEY (project_id, categories_id),
	FOREIGN KEY (project_id) REFERENCES service_projects(project_id),
    FOREIGN KEY (categories_id) REFERENCES categories(categories_id)
);

INSERT INTO categories (c_name)
VALUES 
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO project_categories (project_id, categories_id)
VALUES
-- organization 1: BrightFuture Builders
(1, 1), (1, 3),           -- Argonaut Planter Boxes → Environmental + Community Service
(2, 1), (2, 3),           -- Rinconada Park Fences → Environmental + Community Service
(3, 1), (3, 3),           -- Rinconada Park Playground → Environmental + Community Service
(4, 1), (4, 3),           -- Community Garden Shed → Environmental + Community Service
(5, 2), (5, 3),           -- Local Library Renovation → Educational + Community Service

-- organization 2: GreenHarvest Growers
(6, 1), (6, 2),           -- Urban Farm Workshop → Environmental + Educational
(7, 1), (7, 2),           -- Pollinator Garden → Environmental + Educational
(8, 1), (8, 2),           -- Hydroponic System Installation → Environmental + Educational
(9, 1), (9, 3),           -- Community Composting Program → Environmental + Community Service
(10, 1), (10, 3), (10, 4),-- Farm-to-Table Dinner → Environmental + Community Service + Health & Wellness

-- organization 3: UnityServe Volunteers
(11, 3), (11, 4),          -- Annual Charity Walk → Community Service + Health & Wellness
(12, 3), (12, 4),          -- Clothing Drive → Community Service + Health & Wellness
(13, 3), (13, 4),          -- Food Pantry Setup → Community Service + Health & Wellness
(14, 2), (14, 3),          -- Book Donation Campaign → Educational + Community Service
(15, 3), (15, 4);          -- Toys for Tots Drive → Community Service + Health & Wellness

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description)
VALUES     
	('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE user_id = 4;