import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @deprecated This page has been removed.
 * Redirects to the dashboard if accessed directly.
 */
const Reviews: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Optional: Add a toast notification here if you have a toast system
    // toast.info("The Reviews page has been removed.");
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Reviews;