import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { PostsProvider } from './context/PostsContext';

const App = () => {
    return (
        <AuthProvider>
            <PostsProvider>
                <Router>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Routes>
                </Router>
            </PostsProvider>
        </AuthProvider>
    );
};

export default App;
