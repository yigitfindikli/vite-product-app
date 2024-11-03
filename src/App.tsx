import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import Products from '@/pages/Products/Products';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import PublicLayout from '@/layouts/PublicLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import { AuthProvider } from '@/contexts/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<ProtectedLayout />}>
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/products" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
