import React from 'react';
import { PersonSearchResult } from '@backend/db-types';
import './ResultCard.css';

interface ResultCardProps {
  result: PersonSearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const {
    person: { firstName, lastName, title, email, phoneNumber, username },
    location,
    projects,
  } = result;

  const addressLines: string[] = [];

  if (location.streetAddress) {
    addressLines.push(location.streetAddress);
  }

  if (location.secondaryAddress) {
    addressLines.push(location.secondaryAddress);
  }

  let cityRegionZip = '';

  if (location.city) {
    cityRegionZip += location.city;
  }

  if (location.region) {
    cityRegionZip += cityRegionZip ? `, ${location.region}` : location.region;
  }

  if (location.zipCode) {
    cityRegionZip += cityRegionZip ? ` ${location.zipCode}` : location.zipCode;
  }

  if (cityRegionZip) {
    addressLines.push(cityRegionZip);
  }

  if (location.country) {
    addressLines.push(location.country);
  }

  return (
    <div className="result-card" data-aos="fade-up">
      <h2>
        {firstName} {lastName}
      </h2>

      {title && (
        <p>
          <strong>Title:</strong> {title}
        </p>
      )}

      {addressLines.length > 0 && (
        <p>
          <strong>Location:</strong>
          <br />
          {addressLines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      )}

      <p>
        <strong>Email:</strong>{' '}
        <a href={`mailto:${email}`}>{email}</a>
      </p>

      {phoneNumber && (
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
      )}

      <p>
        <strong>Username:</strong> {username}
      </p>

      {projects && projects.length > 0 && (
        <div className="projects">
          <strong>Projects:</strong>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                {project.name}
                {project.description && ` - ${project.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultCard;