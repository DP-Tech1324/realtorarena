// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isAgent: boolean;
  userRole: string | null;
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
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsAdmin(false);
      setIsAgent(false);
      setUserRole(null);
      return;
    }

    try {
      console.log('🔄 Refreshing profile for user:', user.id);
      console.log('🔄 User email:', user.email);

      // ✅ Fetch admin user role if active - with better error handling
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (adminError) {
        console.error('❌ Admin fetch error:', adminError);
        // Still continue to set default values instead of throwing
      }

      console.log('🔍 Admin data found:', adminData);
      
      const adminStatus = !!adminData && !adminError;
      const role = adminData?.role || null;

      console.log('🔍 Admin status:', adminStatus);
      console.log('🔍 User role:', role);

      setIsAdmin(adminStatus);
      setUserRole(role);
      localStorage.setItem('isAdmin', adminStatus.toString());
      localStorage.setItem('userRole', role || '');

      setIsAgent(false);
      localStorage.setItem('isAgent', 'false');

      setProfile({ ...adminData, role: role || 'user' });

      // If no admin record found, let's try to create one for testing
      if (!adminData && !adminError && user.email) {
        console.log('🔧 No admin record found, checking if we should create one...');
        
        // For testing: if email contains 'admin' or is a specific test email, create admin record
        if (user.email.includes('admin') || user.email === 'dhrumilpatel2401@gmail.com') {
          console.log('🔧 Creating admin record for test user...');
          
          const { data: newAdminData, error: createError } = await supabase
            .from('admin_users')
            .insert([{
              user_id: user.id,
              email: user.email,
              role: 'superadmin',
              is_active: true
            }])
            .select()
            .single();

          if (!createError && newAdminData) {
            console.log('✅ Created admin record:', newAdminData);
            setIsAdmin(true);
            setUserRole('superadmin');
            setProfile(newAdminData);
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('userRole', 'superadmin');
          } else {
            console.error('❌ Failed to create admin record:', createError);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error in refreshProfile:', error);
      setIsAdmin(false);
      setIsAgent(false);
      setUserRole(null);
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('isAgent', 'false');
      localStorage.setItem('userRole', '');
    }
  }, [user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        console.log('🔔 Auth state changed:', _event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await refreshProfile();
        } else {
          setProfile(null);
          setIsAdmin(false);
          setIsAgent(false);
          setUserRole(null);
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('isAgent');
          localStorage.removeItem('userRole');
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('🟢 Initial session:', currentSession?.user?.id);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await refreshProfile();
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
        return { success: false, error: error.message };
      }

      toast({ title: "Signed in successfully", description: "Welcome back!" });
      return { success: true };
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
        options: { data: { first_name: firstName, last_name: lastName } }
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
    localStorage.removeItem('userRole');
    setIsAdmin(false);
    setIsAgent(false);
    setUserRole(null);
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
      userRole,
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
