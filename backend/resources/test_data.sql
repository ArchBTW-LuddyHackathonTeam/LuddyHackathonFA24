-- Insert locations
INSERT INTO location (location_street_address, location_secondary_address, location_city, location_region, location_zip_code, location_country)
VALUES
    ('123 Main St', NULL, 'New York', 'NY', '10001', 'USA'),
    ('456 Elm St', 'Suite 5', 'Los Angeles', 'CA', '90001', 'USA'),
    ('789 Maple Ave', NULL, 'Toronto', 'Ontario', 'M5J 2N8', 'Canada'),
    ('321 Oak Blvd', 'Apt 12', 'Chicago', 'IL', '60605', 'USA'),
    ('567 Birch Ln', NULL, 'Vancouver', 'British Columbia', 'V6E 1B6', 'Canada');

-- Insert persons
INSERT INTO person (person_first_name, person_last_name, person_email, person_username, location_id, person_title, person_phone_number, person_password_hash)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'johndoe', 1, 'Software Engineer', '+1 (123) 456-7890', 'passwordhash1234'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', 2, 'Product Manager', '+1 (213) 456-7890', 'passwordhash5678'),
    ('Alice', 'Johnson', 'alice.j@example.com', 'alicej', 3, 'UI/UX Designer', '+1 (647) 123-4567', 'passwordhash91011'),
    ('Bob', 'Brown', 'bob.b@example.com', 'bobbrown', 4, 'DevOps Engineer', NULL, 'passwordhash121314'),
    ('Charlie', 'Davis', 'charlie.d@example.com', 'charlied', 5, 'Project Manager', '+1 (604) 987-6543', 'passwordhash151617');

-- Insert products
INSERT INTO product (product_name, product_description, contact_person_id)
VALUES
    ('CloudSync', 'A secure cloud storage and synchronization service for individuals and enterprises.', 1),
    ('HealthTrack', 'A comprehensive health tracking app integrating fitness, diet, and medical data.', 2),
    ('EduLearn', 'An e-learning platform with adaptive learning capabilities for personalized education.', 3),
    ('SafePay', 'A payment gateway offering secure, seamless, and multi-currency transactions.', 4),
    ('GreenGrow', 'An app connecting gardeners with organic farming techniques and resources.', 5);

-- Insert repositories
INSERT INTO repository (repository_name, repository_description, contact_person_id)
VALUES
    ('cloudsync-backend', 'Backend services for CloudSync, including user management and file storage APIs.', 1),
    ('cloudsync-frontend', 'Frontend application for CloudSync, featuring responsive and intuitive design.', 1),
    ('healthtrack-api', 'RESTful APIs for HealthTrack, providing endpoints for health data management.', 2),
    ('edulearn-web', 'A web application for EduLearn with user-friendly dashboards and course creation tools.', 3),
    ('edulearn-mobile', 'Mobile app for EduLearn, enabling learning on the go with offline capabilities.', 3),
    ('safepay-gateway', 'Core payment processing system for SafePay, ensuring secure transactions.', 4),
    ('safepay-integration', 'Integration library for merchants to easily connect with SafePay.', 4),
    ('greengrow-web', 'Web-based community platform for GreenGrow with tips and tutorials for gardeners.', 5),
    ('greengrow-mobile', 'Mobile app for GreenGrow to track gardening progress and connect with peers.', 5);
