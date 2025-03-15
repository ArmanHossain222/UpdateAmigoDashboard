import React, { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "My E-Commerce",
    siteURL: "https://www.myecommerce.com",
    email: "admin@myecommerce.com",
    phone: "+1234567890",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveSettings = (section) => {
    alert(`${section} settings have been saved.`);
  };
  
  const handleUpdatePassword = async () => {
    // Clear previous messages
    setMessage({ text: "", type: "" });
    
    // Validate passwords
    if (!settings.oldPassword) {
      setMessage({ text: "Please enter your current password", type: "error" });
      return;
    }
    
    if (!settings.password) {
      setMessage({ text: "Please enter a new password", type: "error" });
      return;
    }
    
    if (settings.password !== settings.confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return;
    }
    
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem("user_token");
    
    if (!token) {
      setMessage({ text: "Authentication error. Please log in again.", type: "error" });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("https://amigofabric.com/api/change-psasword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: settings.oldPassword,
          new_password: settings.password,
          password_confirmation: settings.confirmPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: "Password updated successfully", type: "success" });
        // Clear password fields
        setSettings(prev => ({
          ...prev,
          oldPassword: "",
          password: "",
          confirmPassword: ""
        }));
      } else {
        setMessage({ text: data.message || "Failed to update password", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Network error. Please try again later.", type: "error" });
      console.error("Password update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* General Settings */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleInputChange}
            placeholder="Site Name"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="url"
            name="siteURL"
            value={settings.siteURL}
            onChange={handleInputChange}
            placeholder="Site URL"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
            placeholder="Admin Email"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={settings.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
        </div>
        <button
          onClick={() => handleSaveSettings("General")}
          className="mt-4 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* Account Settings */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        
        {/* Show message if there is one */}
        {message.text && (
          <div className={`p-3 mb-4 rounded ${message.type === "error" ? "bg-red-700" : "bg-green-700"}`}>
            {message.text}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Password Field with Show/Hide Toggle */}
          <div className="relative">
            <input
              type={showPasswords.oldPassword ? "text" : "password"}
              name="oldPassword"
              value={settings.oldPassword}
              onChange={handleInputChange}
              placeholder="Current Password"
              className="bg-gray-700 text-white px-4 py-2 rounded w-full pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("oldPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPasswords.oldPassword ? 
                <span className="text-blue-400">Hide</span> : 
                <span className="text-blue-400">Show</span>
              }
            </button>
          </div>
          
          <div className="md:col-span-2 h-0 md:h-auto"></div> {/* Spacer for alignment */}
          
          {/* New Password Field with Show/Hide Toggle */}
          <div className="relative">
            <input
              type={showPasswords.password ? "text" : "password"}
              name="password"
              value={settings.password}
              onChange={handleInputChange}
              placeholder="New Password"
              className="bg-gray-700 text-white px-4 py-2 rounded w-full pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPasswords.password ? 
                <span className="text-blue-400">Hide</span> : 
                <span className="text-blue-400">Show</span>
              }
            </button>
          </div>
          
          {/* Confirm Password Field with Show/Hide Toggle */}
          <div className="relative">
            <input
              type={showPasswords.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={settings.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm New Password"
              className="bg-gray-700 text-white px-4 py-2 rounded w-full pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPasswords.confirmPassword ? 
                <span className="text-blue-400">Hide</span> : 
                <span className="text-blue-400">Show</span>
              }
            </button>
          </div>
        </div>
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded text-white font-bold ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <div className="flex items-center justify-between mb-4">
          <span>Enable Two-Factor Authentication</span>
          <input
            type="checkbox"
            className="bg-gray-700 text-blue-600 rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Enable Email Notifications</span>
          <input
            type="checkbox"
            className="bg-gray-700 text-blue-600 rounded"
          />
        </div>
        <button
          onClick={() => handleSaveSettings("Security")}
          className="mt-4 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
        >
          Save Security Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;