import { useState } from 'react';
import { register } from '../api/auth';
import { handleApiError } from '../utils/handleError';
import styles from './RegisterPage.module.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const data = await register(name, email, password, passwordConfirmation);
            setMessage(data.message);
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
                    <span className={styles.badge}>Get started</span>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Fill in your details to get started</p>
                </div>

                {message && <div className={styles.successAlert}>{message}</div>}
                {error && <div className={styles.errorAlert}>{error}</div>}

                <form onSubmit={handleSubmit}>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>

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
                            placeholder="Min. 8 characters"
                            required
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Repeat your password"
                            required
                        />
                    </div>

                    <div className={styles.divider} />

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                </form>

                <p className={styles.footer}>
                    Already have an account? <a href="/login">Sign in</a>
                </p>

            </div>
        </div>
    );
}

export default RegisterPage;