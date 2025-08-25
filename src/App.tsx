
import { sql } from "drizzle-orm";
import {db} from "@/db";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { initializeAuth } from "@/lib/auth";
import "./lib/i18n";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import Clients from "./pages/Clients";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import AdminChat from "./pages/AdminChat";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Frontend-only version - no backend queries needed

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
      <p className="text-white text-lg">جاري تحميل التطبيق...</p>
    </div>
  </div>
);

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    console.log('🚀 App starting...');

    // Force stop loading after 2 seconds maximum
    const forceTimeout = setTimeout(() => {
      console.log('⏰ Force stopping initialization');
      setIsInitializing(false);
    }, 2000);

    const init = async () => {
      try {
        console.log('🔄 Trying to initialize auth...');
        await initializeAuth();
        console.log('✅ Auth initialized successfully');
      } catch (error) {
        console.warn('⚠️ Auth initialization failed, continuing anyway:', error);
      } finally {
        clearTimeout(forceTimeout);
        setIsInitializing(false);
        console.log('✅ App ready');
      }
    };

    // Start initialization but don't wait too long
    init();
  }, []);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vendors" 
              element={
                <ProtectedRoute>
                  <Vendors />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clients" 
              element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users" 
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/support" 
              element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-chat" 
              element={
                <ProtectedRoute>
                  <AdminChat />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
