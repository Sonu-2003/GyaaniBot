import { motion } from 'framer-motion';
import { 
  FiSun, 
  FiMoon, 
  FiGlobe, 
  FiUser, 
  FiShield, 
  FiVolume2,
  FiSave,
  FiCheck
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/layout/Navigation';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    soundEffects: true,
    voiceSpeed: [1.0],
    fontSize: [16],
    animationsEnabled: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingsCategories = [
    {
      title: 'Appearance',
      icon: theme === 'dark' ? FiMoon : FiSun,
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          description: 'Choose between light and dark mode',
          type: 'toggle',
          value: theme === 'dark',
          onChange: () => toggleTheme(),
          options: ['Light', 'Dark'],
        },
        {
          id: 'fontSize',
          label: 'Font Size',
          description: 'Adjust text size for better readability',
          type: 'slider',
          value: settings.fontSize,
          onChange: (value: number[]) => handleSettingChange('fontSize', value),
          min: 12,
          max: 24,
          step: 1,
        },
        {
          id: 'animations',
          label: 'Animations',
          description: 'Enable smooth animations and transitions',
          type: 'switch',
          value: settings.animationsEnabled,
          onChange: (value: boolean) => handleSettingChange('animationsEnabled', value),
        },
      ],
    },
    {
      title: 'Language & Region',
      icon: FiGlobe,
      settings: [
        {
          id: 'language',
          label: 'Interface Language',
          description: 'Select your preferred language',
          type: 'select',
          value: language,
          onChange: (value: string) => setLanguage(value as any),
          options: languages.map(lang => ({ value: lang.code, label: lang.nativeName })),
        },
      ],
    },
    {
      title: 'Audio & Voice',
      icon: FiVolume2,
      settings: [
        {
          id: 'soundEffects',
          label: 'Sound Effects',
          description: 'Play sounds for notifications and interactions',
          type: 'switch',
          value: settings.soundEffects,
          onChange: (value: boolean) => handleSettingChange('soundEffects', value),
        },
        {
          id: 'voiceSpeed',
          label: 'Voice Speed',
          description: 'Adjust text-to-speech reading speed',
          type: 'slider',
          value: settings.voiceSpeed,
          onChange: (value: number[]) => handleSettingChange('voiceSpeed', value),
          min: 0.5,
          max: 2.0,
          step: 0.1,
        },
      ],
    },
    {
      title: 'Chat & Privacy',
      icon: FiShield,
      settings: [
        {
          id: 'notifications',
          label: 'Notifications',
          description: 'Receive notifications about new messages',
          type: 'switch',
          value: settings.notifications,
          onChange: (value: boolean) => handleSettingChange('notifications', value),
        },
        {
          id: 'autoSave',
          label: 'Auto-save Chats',
          description: 'Automatically save conversation history',
          type: 'switch',
          value: settings.autoSave,
          onChange: (value: boolean) => handleSettingChange('autoSave', value),
        },
      ],
    },
  ];

  const renderSetting = (setting: any) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center space-x-3">
            <Button
              variant={setting.value ? 'default' : 'outline'}
              size="sm"
              onClick={setting.onChange}
              className="flex items-center space-x-2"
            >
              {setting.value ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
              <span>{setting.value ? setting.options[1] : setting.options[0]}</span>
            </Button>
          </div>
        );
      
      case 'switch':
        return (
          <Switch
            checked={setting.value}
            onCheckedChange={setting.onChange}
          />
        );
      
      case 'slider':
        return (
          <div className="space-y-2 min-w-[200px]">
            <Slider
              value={setting.value}
              onValueChange={setting.onChange}
              max={setting.max}
              min={setting.min}
              step={setting.step}
              className="flex-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{setting.min}</span>
              <span className="font-medium">{setting.value[0]}{setting.id === 'voiceSpeed' ? 'x' : 'px'}</span>
              <span>{setting.max}</span>
            </div>
          </div>
        );
      
      case 'select':
        return (
          <Select value={setting.value} onValueChange={setting.onChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {setting.options.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Customize your Smart Education experience
            </p>
          </div>

          {/* Settings Categories */}
          <div className="space-y-6">
            {settingsCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>

                  <div className="space-y-6">
                    {category.settings.map((setting, settingIndex) => (
                      <motion.div
                        key={setting.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index * 0.1) + (settingIndex * 0.05) }}
                        className="flex items-center justify-between py-4 border-b border-border last:border-b-0"
                      >
                        <div className="space-y-1 flex-1">
                          <Label className="text-base font-medium">
                            {setting.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                        
                        <div className="ml-4">
                          {renderSetting(setting)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-primary hover:opacity-90 px-8"
              disabled={saved}
            >
              {saved ? (
                <>
                  <FiCheck className="w-4 h-4 mr-2" />
                  Settings Saved!
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you have questions about these settings or need assistance, 
                feel free to ask in the chat or contact our support team.
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">Version 1.0.0</Badge>
                <Badge variant="outline">Beta</Badge>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;