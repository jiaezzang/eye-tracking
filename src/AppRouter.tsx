import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
/**
 * Router
 * @returns {JSX.Element} Router 컴포넌트
 */
export default function AppRouter(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Main />} />
            </Routes>
        </Router>
    );
}
