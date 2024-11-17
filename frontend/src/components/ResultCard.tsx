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
    products,
    repositories,
  } = result;

  const addressLines: string[] = [];

  if (location) {
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

      {products && products.length > 0 && (
        <div className="products">
          <strong>Products:</strong>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name}
                {product.description && ` - ${product.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {repositories && repositories.length > 0 && (
        <div className="repositories">
          <strong>Repositories:</strong>
          <ul>
            {repositories.map((repository) => (
              <li key={repository.id}>
                {repository.name}
                {repository.description && ` - ${repository.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultCard;