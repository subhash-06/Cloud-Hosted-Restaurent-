import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Setting {
  setting_key: string;
  setting_value: string;
  description: string;
}

export const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*');

    if (error) {
      toast({ title: 'Error fetching settings', variant: 'destructive' });
      return;
    }

    const settingsMap = (data || []).reduce((acc, setting) => {
      acc[setting.setting_key] = setting.setting_value;
      return acc;
    }, {} as Record<string, string>);

    setSettings(settingsMap);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({
        setting_key: key,
        setting_value: value,
        updated_by: user?.id,
      });

    if (error) {
      toast({ title: 'Error updating setting', variant: 'destructive' });
      return;
    }

    toast({ title: 'Setting updated successfully' });
    fetchSettings();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Note:</strong> API keys and secrets are managed securely through Lovable Cloud backend secrets.
            </p>
            <p>
              These credentials are encrypted and only accessible to backend functions, never exposed to the client.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send email alerts for critical security events
              </p>
            </div>
            <Switch
              checked={settings['email_notifications'] === 'true'}
              onCheckedChange={(checked) =>
                updateSetting('email_notifications', checked.toString())
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send SMS alerts for urgent security threats
              </p>
            </div>
            <Switch
              checked={settings['sms_notifications'] === 'true'}
              onCheckedChange={(checked) =>
                updateSetting('sms_notifications', checked.toString())
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Real-time Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Show pop-up notifications for new security alerts
              </p>
            </div>
            <Switch
              checked={settings['realtime_alerts'] === 'true'}
              onCheckedChange={(checked) =>
                updateSetting('realtime_alerts', checked.toString())
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
