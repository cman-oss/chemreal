import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  minTier?: 'starter' | 'pro' | 'enterprise';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, minTier }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user has no active subscription (tier is 'none'), redirect to pricing
  // But allow them to stay on the page if they just finished a checkout (session_id in URL)
  const hasSessionId = new URLSearchParams(location.search).has('session_id');
  
  if ((!profile || profile.tier === 'none') && !hasSessionId) {
    return <Navigate to="/pricing" replace />;
  }

  if (hasSessionId && (!profile || profile.tier === 'none')) {
    return <Loading />; // Show loading while webhook processes
  }

  if (minTier) {
    const currentTier = profile?.tier || 'none';
    const tierOrder = { 'none': 0, 'starter': 1, 'pro': 2, 'enterprise': 3 };
    if (tierOrder[currentTier] < tierOrder[minTier]) {
      return <Navigate to="/pricing" replace />;
    }
  }

  return <>{children}</>;
};
