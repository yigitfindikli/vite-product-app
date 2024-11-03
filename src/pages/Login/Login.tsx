import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import TextInput from '@/components/TextInput/TextInput';
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login({ username, password });
            navigate('/products');
        } catch {
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <div data-testid="login-page" className={styles['login-page']}>
            <div className={styles['login-card']}>
                <div className={styles['login-card__header']}>
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label>Username:</label>
                        <TextInput
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Password:</label>
                        <TextInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles['login-card__error-message']}>{error}</p>}
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
