import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; user?: User | null; error?: string }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isAgent: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const refreshProfile = async () => {
    const currentUser = (await supabase.auth.getUser()).data.user;
    if (!currentUser) {
      setProfile(null);
      setIsAdmin(false);
      setIsAgent(false);
      return;
    }

    try {
      console.log('Checking admin status for user:', currentUser.id);

      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('is_active', true)
        .maybeSingle();

      console.log('Admin data:', adminData, 'Error:', adminError);

      const adminStatus = !!adminData && !adminError;
      setIsAdmin(adminStatus);
      localStorage.setItem('isAdmin', adminStatus.toString());

      setIsAgent(false);
      localStorage.setItem('isAgent', 'false');

      setUser(currentUser);

      const newProfile = {
        ...adminData,
        role: adminStatus ? 'admin' : 'user',
      };
      setProfile(newProfile);

      // ✅ Redirect after login or refresh
      if (adminStatus && ["/", "/auth"].includes(location.pathname)) {
        navigate('/admin');
      }

    } catch (error) {
      console.error('Error in refreshProfile:', error);
      setIsAdmin(false);
      setIsAgent(false);
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('isAgent', 'false');
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        console.log('Auth state changed:', _event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          setTimeout(() => refreshProfile(), 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setIsAgent(false);
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('isAgent');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session:', currentSession?.user?.id);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        refreshProfile();
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
        return { success: false, error: error.message };
      }

      toast({ title: "Signed in successfully", description: "Welcome back!" });
      const currentUser = (await supabase.auth.getUser()).data.user;
      return { success: true, user: currentUser ?? null };
    } catch (error: any) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName }
        }
      });

      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
        return { success: false, error: error.message };
      }

      toast({ title: "Sign up successful", description: "Please check your email to verify your account." });
      return { success: true };
    } catch (error: any) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isAgent');
    setIsAdmin(false);
    setIsAgent(false);
    setProfile(null);
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signIn,
      signUp,
      signOut,
      isAdmin,
      isAgent,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
