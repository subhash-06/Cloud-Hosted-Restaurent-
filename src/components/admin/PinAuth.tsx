import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

interface PinAuthProps {
  onSuccess: () => void;
}

export const PinAuth = ({ onSuccess }: PinAuthProps) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const verifyPin = async () => {
    if (!pin || pin.length === 0) {
      toast({
        title: 'PIN Required',
        description: 'Please enter your admin PIN',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Get the active PIN hash from database
      const { data: pinData, error: fetchError } = await supabase
        .from('admin_pins')
        .select('pin_hash')
        .eq('is_active', true)
        .single();

      if (fetchError || !pinData) {
        toast({
          title: 'Authentication Error',
          description: 'Unable to verify PIN. Please try again.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Verify PIN using PostgreSQL crypt function
      const { data: verifyData, error: verifyError } = await supabase.rpc('verify_admin_pin' as any, {
        input_pin: pin,
      }) as { data: boolean | null; error: any };

      if (verifyError) {
        toast({
          title: 'Verification Failed',
          description: 'Unable to verify PIN. Please try again.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (verifyData) {
        // PIN is correct - store both verification status and PIN
        sessionStorage.setItem('admin_pin_verified', 'true');
        sessionStorage.setItem('admin_pin', pin);
        toast({
          title: 'Access Granted',
          description: 'Welcome to the admin dashboard',
        });
        onSuccess();
      } else {
        toast({
          title: 'Invalid PIN',
          description: 'The PIN you entered is incorrect',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setPin('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      verifyPin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter your PIN to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="text-center text-2xl tracking-widest"
              maxLength={6}
            />
          </div>
          <Button
            onClick={verifyPin}
            disabled={loading || !pin}
            className="w-full"
          >
            {loading ? 'Verifying...' : 'Verify PIN'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
