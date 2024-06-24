import React, { useState, useEffect } from "react";
import axios from "axios";

import "./CustomerPage.css";

const WebsiteSettings = () => {
  const [websiteSettings, setWebSiteSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [minimumOrderValue, setMinimumOrderValue] = useState(0);

  useEffect(() => {
    fetchWebSiteSettings();
  }, []);

  const fetchWebSiteSettings = async () => {
    try {
      const response = await axios.get("http://localhost:9090/website-setting");
      setIsLoading(false);
      setWebSiteSettings(response.data);
      if (response.data) {
        setMinimumOrderValue(response.data.minimumValue);
      }
    } catch (error) {
      console.error("Error fetching websiteSettings", error);
    }
  };

  const updateWebSiteSettings = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9090/website-setting",
        {
          minimumValue: minimumOrderValue,
        }
      );
      setIsLoading(false);
      setWebSiteSettings(response.data);
      if (response.data) {
        setMinimumOrderValue(response.data.minimumValue);
      }
    } catch (error) {
      console.error("Error fetching websiteSettings", error);
    }
  };

  if (isLoading) {
    return "Loading...";
  }
  if (!websiteSettings) {
    return (
      <div>
        "No Data Found..."
        <div>
          <p>Add Minimum Order Value </p>
          <input
            type="number"
            min="0"
            value={minimumOrderValue}
            onChange={(e) => setMinimumOrderValue(e.target.value)}
          />
          <button onClick={updateWebSiteSettings}>Save</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>Update Minimum Order Value </p>
      <input
        type="number"
        min="0"
        value={minimumOrderValue}
        onChange={(e) => setMinimumOrderValue(e.target.value)}
      />
      <button onClick={updateWebSiteSettings}>Save</button>
    </div>
  );
};

export default WebsiteSettings;
