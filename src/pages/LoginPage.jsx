import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from '../api/auth';
import { handleApiError } from '../utils/handleError';
import styles from './LoginPage.module.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>

                <div className={styles.header}>
                    <span className={styles.badge}>Welcome back</span>
                    <h1 className={styles.title}>Sign In</h1>
                    <p className={styles.subtitle}>Enter your credentials to continue</p>
                </div>

                {error && <div className={styles.errorAlert}>{error}</div>}

                <form onSubmit={handleSubmit}>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            className={styles.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className={styles.divider} />

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                </form>

                <p className={styles.footer}>
                    No account yet? <Link to="/register">Register here</Link>
                </p>

            </div>
        </div>
    );
}

export default LoginPage;