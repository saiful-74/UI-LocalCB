import { useState } from 'react';
import { 
  FaCog, 
  FaDatabase, 
  FaLock, 
  FaBell, 
  FaEnvelope, 
  FaSave,
  FaUndo
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'LocalChefBazaar',
      siteDescription: 'Marketplace for Local Home-Cooked Meals',
      timezone: 'UTC',
      language: 'en',
      maintenanceMode: false,
    },
    security: {
      twoFactorAuth: true,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      sessionTimeout: 30,
      ipWhitelist: '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      orderAlerts: true,
      systemAlerts: true,
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@localchefbazaar.com',
      fromName: 'LocalChefBazaar',
    },
    database: {
      backupFrequency: 'daily',
      retentionPeriod: 30,
      autoCleanup: true,
      compressionEnabled: true,
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: <FaCog /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'email', label: 'Email', icon: <FaEnvelope /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> },
  ];

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically send the settings to your backend
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    // Reset to default values
    toast.success('Settings reset to defaults!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Site Name
        </label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Site Description
        </label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="CST">Central Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
          className="mr-2 cursor-pointer"
        />
        <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
          Enable Maintenance Mode
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="twoFactorAuth"
          checked={settings.security.twoFactorAuth}
          onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
          className="mr-2 cursor-pointer"
        />
        <label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
          Enable Two-Factor Authentication
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Expiry (days)
          </label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          IP Whitelist (comma-separated)
        </label>
        <textarea
          value={settings.security.ipWhitelist}
          onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.value)}
          placeholder="192.168.1.1, 10.0.0.1"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            Email Notifications
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pushNotifications"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            Push Notifications
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            checked={settings.notifications.smsNotifications}
            onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            SMS Notifications
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="orderAlerts"
            checked={settings.notifications.orderAlerts}
            onChange={(e) => handleInputChange('notifications', 'orderAlerts', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="orderAlerts" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            Order Alerts
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="systemAlerts"
            checked={settings.notifications.systemAlerts}
            onChange={(e) => handleInputChange('notifications', 'systemAlerts', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="systemAlerts" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            System Alerts
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SMTP Host
          </label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SMTP Port
          </label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => handleInputChange('email', 'smtpPort', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SMTP Username
          </label>
          <input
            type="text"
            value={settings.email.smtpUser}
            onChange={(e) => handleInputChange('email', 'smtpUser', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SMTP Password
          </label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From Email
          </label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From Name
          </label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Backup Frequency
        </label>
        <select
          value={settings.database.backupFrequency}
          onChange={(e) => handleInputChange('database', 'backupFrequency', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Retention Period (days)
        </label>
        <input
          type="number"
          value={settings.database.retentionPeriod}
          onChange={(e) => handleInputChange('database', 'retentionPeriod', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoCleanup"
            checked={settings.database.autoCleanup}
            onChange={(e) => handleInputChange('database', 'autoCleanup', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="autoCleanup" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            Enable Auto Cleanup
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="compressionEnabled"
            checked={settings.database.compressionEnabled}
            onChange={(e) => handleInputChange('database', 'compressionEnabled', e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="compressionEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            Enable Compression
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'email':
        return renderEmailSettings();
      case 'database':
        return renderDatabaseSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || System Settings</title>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          System Settings
        </h1>
        <p className="text-gray-600">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} related settings
              </p>
            </div>

            {renderTabContent()}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <FaUndo />
                Reset
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                <FaSave />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;