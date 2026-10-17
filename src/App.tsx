/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ColorProvider } from "./contexts/ColorContext";
import { ClassProvider } from "./contexts/ClassContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Index from "./pages/Index";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import GlobalNetwork from "./pages/GlobalNetwork";
import { GatedLanding } from "./components/GatedLanding";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
}

function TokenRedirector() {
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/" || pathname === "") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        window.location.replace(`/${token}`);
      }
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ColorProvider>
          <ClassProvider>
            <ScrollToTop />
            <TokenRedirector />
            <Routes>
              <Route path="/" element={<GatedLanding><Home /></GatedLanding>} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/courses" element={<GatedLanding><Index /></GatedLanding>} />
              <Route path="/course/:id" element={<GatedLanding><CourseDetail /></GatedLanding>} />
              <Route path="/my-courses" element={<GatedLanding><MyCourses /></GatedLanding>} />
              <Route path="/buat-profil" element={<CreateProfile />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/partner-profile" element={<CreateProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/profiles" element={<Profile />} />
              <Route path="/partner" element={<GlobalNetwork />} />
              <Route path="/partners" element={<GlobalNetwork />} />
              <Route path="/mitra" element={<GlobalNetwork />} />
              <Route path="/global-network" element={<GlobalNetwork />} />
              <Route path="/global" element={<GlobalNetwork />} />
              <Route path="/titik-lokasi" element={<GlobalNetwork />} />
              <Route path="/locations" element={<GlobalNetwork />} />
              {/* Catch-all dynamic slug route for custom invite links */}
              <Route path="/:slug" element={<GatedLanding><Index /></GatedLanding>} />
            </Routes>
          </ClassProvider>
        </ColorProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
