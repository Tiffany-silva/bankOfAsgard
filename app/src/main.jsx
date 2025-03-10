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

import { AuthProvider } from "@asgardeo/auth-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL: `${import.meta.env.VITE_REACT_APP_CLIENT_BASE_URL}`,
        signOutRedirectURL: `${import.meta.env.VITE_REACT_APP_CLIENT_BASE_URL}`,
        clientID: `${import.meta.env.VITE_REACT_APP_CLIENT_ID}`,
        baseUrl: `${import.meta.env.VITE_REACT_APP_ASGARDEO_BASE_URL}`,
        resourceServerURLs: [`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}`],
        scope: ['openid', 'address', 'email', 'phone', 'profile', 'internal_login'],
      }}
    >
      <App />
    </AuthProvider>
  </StrictMode>,
);
