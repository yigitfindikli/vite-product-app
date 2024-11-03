import { useAuth } from "@/hooks/useAuth";
import Button from "../Button/Button";
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles['header__container']}>
                <h2>Welcome</h2>
                <Button variant="danger" layout="outlined" style={{ fontSize: 'var(--font-size-xs)' }} onClick={handleLogout}>Logout</Button>
            </div>
        </header>
    );
};

export default Header;
