/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { replace } from "react-router-dom";

const EditProfile = ({ userInfo, onUpdateSuccess, onCancel }) => {
  
  const ASGARDEO_BASE_URL_SCIM2 = "https://api.asgardeo.io/t/sampleorg1/scim2/Me";
  const { httpRequest } = useAuthContext();
  
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    dob: "",
    email: "",
    mobile: "",
    password: "",
  });

  const request = requestConfig =>
    httpRequest(requestConfig)
      .then(response => response)
      .catch(error => error);

  useEffect(() => {
    if (userInfo) {
        console.log("inside userinfo" +userInfo);

      setFormData({
        givenName: userInfo.givenName || "",
        familyName: userInfo.familyName || "",
        dob: userInfo.birthdate || "",
        email: userInfo.email || "",
        mobile: userInfo.mobile || "",
        password: "",
      });
      console.log("inside usereffect" +formData);
    }
  }, [ userInfo ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
        
        const operations = [];
        // Add updated values to the PATCH request only if they are modified
        const valuePayload = {};

        if (formData.givenName.trim() !== "" || formData.familyName.trim() !== "") {
            valuePayload.name = {};
            if (formData.givenName.trim() !== "") valuePayload.name.givenName = formData.givenName;
            if (formData.familyName.trim() !== "") valuePayload.name.familyName = formData.familyName;
        }

        if (formData.email.trim() !== "") {
            valuePayload.emails = [formData.email];
          }
          if (formData.mobile.trim() !== "") {
            valuePayload.phoneNumbers = [{ type: "mobile", value: formData.mobile }];
          }
      
          if (formData.dob.trim() !== "") {
            valuePayload["urn:scim:wso2:schema"] = { dateOfBirth: formData.dob };
          }

          if (formData.password.trim() !== "") {
            valuePayload.password = formData.password;
          }
      
          if (Object.keys(valuePayload).length > 0) {
            operations.push({ op: "replace", value: valuePayload });
          }

           // If no fields were updated, return early
        if (operations.length === 0) {
            alert("No changes made.");
            return;
        }
  

        const payload = {
            schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
            Operations: operations,
        };

        const response = await request({
        method: "PATCH",
        url: `${ASGARDEO_BASE_URL_SCIM2}`,
        data: payload,
        headers: { "Content-Type": "application/json" },
      });
      
      alert("Profile updated successfully");
      onUpdateSuccess();
    } catch (error) {
      alert("Profile update failed: " + (error.detail || error));
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px", marginTop: "20px", maxWidth: "700px", margin: "auto"}}>
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "250px auto", gap: "15px", alignItems: "center" }}>

        <label>First Name:</label>
        <input type="text" name="givenName" placeholder="First Name" value={formData.givenName} onChange={handleChange} style={{ width: "100%", padding: "8px", fontSize: "12px" }}/>

        <label>Last Name:</label>
        <input type="text" name="familyName" placeholder="Last Name" value={formData.familyName} onChange={handleChange} style={{ width: "100%", padding: "8px", fontSize: "12px" }} />

        <label>Date of Birth:</label>
        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} style={{ width: "100%", padding: "8px", fontSize: "12px" }}/>

        <label>Email:</label>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}  style={{ width: "100%", padding: "8px", fontSize: "12px" }}/>

        <label>Mobile:</label>
        <input type="tel" name="mobile" placeholder="Phone Number" value={formData.mobile} onChange={handleChange} style={{ width: "100%", padding: "8px", fontSize: "12px" }}/>

        <label>Password:</label>
        <input type="password" name="password" placeholder="New Password (Optional)" value={formData.password} onChange={handleChange} style={{ width: "100%", padding: "8px", fontSize: "12px" }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px" }}>
          <button type="submit">Update Profile</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>      
      </form>
    </div>
  );
}

export default EditProfile;