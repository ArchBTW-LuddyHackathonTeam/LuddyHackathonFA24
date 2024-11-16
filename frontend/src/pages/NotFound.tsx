import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;