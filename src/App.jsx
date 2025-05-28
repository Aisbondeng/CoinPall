
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { WalletProvider, useWallet } from '@/contexts/WalletContext.jsx';
import Dashboard from '@/pages/Dashboard';
import Send from '@/pages/Send';
import Receive from '@/pages/Receive';
import History from '@/pages/History';
import Settings from '@/pages/Settings';
import NodeSettings from '@/pages/NodeSettings';
import Swap from '@/pages/Swap';
import Dapps from '@/pages/Dapps';
import Market from '@/pages/Market';
import BuyCrypto from '@/pages/BuyCrypto';
import NftMarketplace from '@/pages/NftMarketplace';
import Earn from '@/pages/Earn';
import WalletManagement from '@/pages/WalletManagement';
import Notifications from '@/pages/Notifications';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Welcome from '@/pages/Welcome';
import CreatePin from '@/pages/CreatePin';
import VerifyPin from '@/pages/VerifyPin';
import SecuritySettings from '@/pages/SecuritySettings';
import BackupPhrase from '@/pages/BackupPhrase';

const PinProtection = ({ children }) => {
  const { isAuthenticated, isPinSet, isPinVerified, isInitialLoading: isWalletContextInitialLoading, isPinLoading } = useWallet();
  const location = useLocation();

  if (isWalletContextInitialLoading || isPinLoading) {
    return <div className="min-h-screen wallet-bg dark flex items-center justify-center text-white">Memuat status PIN...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  if (isPinSet() && !isPinVerified) {
     if (location.pathname !== '/verify-pin' && location.pathname !== '/create-pin') {
        return <Navigate to="/verify-pin" state={{ from: location }} replace />;
     }
  }
  
  return children;
};


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialLoading: isAuthContextInitialLoading, isPinSet, isPinVerified, isPinLoading } = useWallet();
  const location = useLocation();

  if (isAuthContextInitialLoading || isPinLoading) {
    return (
      <div className="min-h-screen wallet-bg dark flex items-center justify-center text-white">
        Memverifikasi sesi...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  
  if (isPinSet() && !isPinVerified) {
     if (location.pathname !== '/verify-pin' && location.pathname !== '/create-pin') {
        return <Navigate to="/verify-pin" state={{ from: location }} replace />;
     }
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, isInitialLoading: isAuthContextInitialLoading, isPinLoading } = useWallet();
  const location = useLocation();

  if (isAuthContextInitialLoading || isPinLoading) {
    return (
      <div className="min-h-screen wallet-bg dark flex items-center justify-center text-white">
        Memverifikasi sesi...
      </div>
    );
  }

  if (isAuthenticated) {
     return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

function AppContent() {
  const { isInitialLoading } = useWallet();

  if (isInitialLoading) {
    return (
      <div className="min-h-screen wallet-bg dark flex items-center justify-center text-white">
        Memuat Aplikasi...
      </div>
    );
  }
  
  return (
    <div className="min-h-screen wallet-bg dark">
      <Routes>
        <Route path="/welcome" element={<AuthRoute><Welcome /></AuthRoute>} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        
        <Route 
            path="/create-pin" 
            element={
                <ProtectedRoute>
                    <CreatePin />
                </ProtectedRoute>
            } 
        />
        <Route path="/verify-pin" element={<VerifyPin />} />

        <Route path="/" element={<ProtectedRoute><PinProtection><Dashboard /></PinProtection></ProtectedRoute>} />
        <Route path="/send" element={<ProtectedRoute><PinProtection><Send /></PinProtection></ProtectedRoute>} />
        <Route path="/receive" element={<ProtectedRoute><PinProtection><Receive /></PinProtection></ProtectedRoute>} />
        <Route path="/swap" element={<ProtectedRoute><PinProtection><Swap /></PinProtection></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><PinProtection><History /></PinProtection></ProtectedRoute>} />
        
        <Route path="/settings" element={<ProtectedRoute><PinProtection><Settings /></PinProtection></ProtectedRoute>} />
        <Route path="/settings/node" element={<ProtectedRoute><PinProtection><NodeSettings /></PinProtection></ProtectedRoute>} />
        <Route path="/settings/security" element={<ProtectedRoute><PinProtection><SecuritySettings /></PinProtection></ProtectedRoute>} />
        <Route path="/settings/backup-phrase" element={<ProtectedRoute><PinProtection><BackupPhrase /></PinProtection></ProtectedRoute>} />

        <Route path="/dapps" element={<ProtectedRoute><PinProtection><Dapps /></PinProtection></ProtectedRoute>} />
        <Route path="/market" element={<ProtectedRoute><PinProtection><Market /></PinProtection></ProtectedRoute>} />
        <Route path="/buy" element={<ProtectedRoute><PinProtection><BuyCrypto /></PinProtection></ProtectedRoute>} />
        <Route path="/nft" element={<ProtectedRoute><PinProtection><NftMarketplace /></PinProtection></ProtectedRoute>} />
        <Route path="/earn" element={<ProtectedRoute><PinProtection><Earn /></PinProtection></ProtectedRoute>} />
        <Route path="/wallet-management" element={<ProtectedRoute><PinProtection><WalletManagement /></PinProtection></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><PinProtection><Notifications /></PinProtection></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
