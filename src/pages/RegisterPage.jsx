import { useState } from 'react';
import { register } from '../api/auth';
import styles from './RegisterPage.module.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setMessage('');

        try {
            const data = await register(name, email, password, passwordConfirmation);
            setMessage(data.message);
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setMessage('Something went wrong...');
            }
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

                <form onSubmit={handleSubmit}>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        {errors.name && <p className={styles.fieldError}>{errors.name[0]}</p>}
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                        />
                        {errors.email && <p className={styles.fieldError}>{errors.email[0]}</p>}
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            required
                        />
                        {errors.password && <p className={styles.fieldError}>{errors.password[0]}</p>}
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                            className={`${styles.input} ${errors.password_confirmation ? styles.inputError : ''}`}
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Repeat your password"
                            required
                        />
                        {errors.password_confirmation && (
                            <p className={styles.fieldError}>{errors.password_confirmation[0]}</p>
                        )}
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