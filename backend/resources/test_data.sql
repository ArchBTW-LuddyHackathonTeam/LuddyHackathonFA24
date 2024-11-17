-- Insert locations
INSERT INTO location (location_street_address, location_secondary_address, location_city, location_region, location_zip_code, location_country)
VALUES
    ('100 Cyber Ave', NULL, 'San Jose', 'CA', '95110', 'USA'),
    ('200 Data St', NULL, 'New York', 'NY', '10001', 'USA'),
    ('300 ML Blvd', NULL, 'London', 'Greater London', 'SW1A 1AA', 'UK'),
    ('400 DevOps Rd', NULL, 'Sydney', 'NSW', '2000', 'Australia'),
    ('500 Cloud Dr', NULL, 'Toronto', 'Ontario', 'M5H 2N2', 'Canada');

-- Insert persons with specializations
INSERT INTO person (person_first_name, person_last_name, person_email, person_username, location_id, person_title, person_phone_number, person_password_hash)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'johndoe', 1, 'Cybersecurity Analyst', '+1-555-123-4567', 'passwordhash1'),
    ('Alice', 'Smith', 'alice.smith@example.com', 'alicesmith', 2, 'Data Scientist', '+1-555-234-5678', 'passwordhash2'),
    ('Bob', 'Johnson', 'bob.johnson@example.co.uk', 'bobjohnson', 3, 'Machine Learning Engineer', '+44-7000-123456', 'passwordhash3'),
    ('Emma', 'Davis', 'emma.davis@example.com.au', 'emmadavis', 4, 'DevOps Engineer', '+61-400-123-456', 'passwordhash4'),
    ('Michael', 'Brown', 'michael.brown@example.ca', 'michaelbrown', 5, 'Backend Developer', '+1-647-123-4567', 'passwordhash5'),
    ('Olivia', 'Wilson', 'olivia.wilson@example.com', 'oliviawilson', 2, 'Frontend Developer', '+1-555-345-6789', 'passwordhash6'),
    ('Daniel', 'Taylor', 'daniel.taylor@example.ca', 'danieltaylor', 5, 'Cloud Architect', '+1-647-234-5678', 'passwordhash7'),
    ('Sophia', 'Martinez', 'sophia.martinez@example.co.uk', 'sophiamartinez', 3, 'Software Engineer', '+44-7000-234567', 'passwordhash8'),
    ('Liam', 'Anderson', 'liam.anderson@example.com.au', 'liamanderson', 4, 'Database Administrator', '+61-400-234-567', 'passwordhash9'),
    ('Mia', 'Thomas', 'mia.thomas@example.com', 'miathomas', 1, 'Project Manager', '+1-555-456-7890', 'passwordhash10'),
    ('David', 'Lee', 'david.lee@example.com', 'davidlee', 1, 'Cybersecurity Specialist', '+1-555-567-8901', 'passwordhash11'),
    ('Karen', 'Miller', 'karen.miller@example.com', 'karenmiller', 2, 'AI Researcher', '+1-555-678-9012', 'passwordhash12'),
    ('Mark', 'Davis', 'mark.davis@example.co.uk', 'markdavis', 3, 'Cybersecurity Consultant', '+44-7000-345678', 'passwordhash13');

-- Insert products associated with the persons
INSERT INTO product (product_name, product_description, contact_person_id)
VALUES
    ('SecureGuard', 'A comprehensive cybersecurity platform providing threat detection and response solutions.', 1),
    ('DataInsights', 'An advanced analytics platform for big data processing and visualization.', 2),
    ('MLPro', 'A machine learning platform for building and deploying ML models at scale.', 3),
    ('DevOpsX', 'A DevOps platform integrating CI/CD pipelines with monitoring tools.', 4),
    ('APIBuilder', 'A tool for rapidly building and deploying scalable APIs.', 5),
    ('WebUI', 'A front-end framework for building responsive web applications.', 6),
    ('CloudMaster', 'A cloud management platform for multi-cloud deployments.', 7),
    ('CodeStudio', 'An integrated development environment for collaborative coding.', 8),
    ('DBShield', 'A database security and monitoring solution.', 9),
    ('ProjectFlow', 'A project management tool for agile teams.', 10),
    ('ThreatAnalytics', 'A tool for analyzing cybersecurity threats in real-time.', 11),
    ('AIConnect', 'A platform connecting AI algorithms with real-world applications.', 12),
    ('SecureCloud', 'A cloud-based cybersecurity solution for small businesses.', 13);

-- Insert repositories associated with the persons
INSERT INTO repository (repository_name, repository_description, contact_person_id)
VALUES
    ('secureguard-core', 'Core components of the SecureGuard cybersecurity platform.', 1),
    ('datainsights-analytics', 'Analytics modules for the DataInsights platform.', 2),
    ('mlpro-models', 'Pre-trained models and scripts for MLPro.', 3),
    ('devopsx-pipeline', 'Pipeline configurations and scripts for the DevOpsX platform.', 4),
    ('apibuilder-framework', 'Backend framework components for APIBuilder.', 5),
    ('webui-components', 'Component library for the WebUI framework.', 6),
    ('cloudmaster-services', 'Microservices for the CloudMaster platform.', 7),
    ('codestudio-editor', 'Code editor components for CodeStudio.', 8),
    ('dbshield-monitor', 'Monitoring tools for the DBShield platform.', 9),
    ('projectflow-web', 'Web application for ProjectFlow.', 10),
    ('threatanalytics-engine', 'The analysis engine for the ThreatAnalytics tool.', 11),
    ('aiconnect-algorithms', 'AI algorithms for the AIConnect platform.', 12),
    ('securecloud-platform', 'Core platform for SecureCloud.', 13);