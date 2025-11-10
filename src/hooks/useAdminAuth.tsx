import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useAdminAuth = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/auth', { replace: true });
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        if (error || !data) {
          // Instead of redirecting, set access denied state
          // This makes it clear that RLS is the actual security boundary
          setAccessDenied(true);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setIsAdmin(true);
        setAccessDenied(false);
        setLoading(false);
      } catch (error) {
        setAccessDenied(true);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, authLoading, navigate]);

  return { isAdmin, loading, accessDenied };
};
