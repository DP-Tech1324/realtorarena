
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials against our test admin account
    if (username === 'admin' && password === 'Paul@test') {
      // Set admin status in localStorage
      localStorage.setItem('isAdmin', 'true');
      
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
      });
      
      // Notify parent component of successful login
      onLoginSuccess();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the admin panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="admin"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-realtor-navy hover:bg-realtor-navy/90">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 text-center border-t pt-4">
        <p className="w-full">For testing, use username: <strong>admin</strong> and password: <strong>Paul@test</strong></p>
      </CardFooter>
    </Card>
  );
};

export default AdminLogin;
