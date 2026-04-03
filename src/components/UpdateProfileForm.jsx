import { useState, useEffect } from 'react';
import { updateProfile } from '../api/auth';
import { handleApiError } from '../utils/handleError';
import styles from './UpdateProfileForm.module.css';

function UpdateProfileForm({ currentName, currentEmail, onSuccess }) {
  const [name, setName] = useState(currentName || '');
  const [email, setEmail] = useState(currentEmail || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentName) setName(currentName);
    if (currentEmail) setEmail(currentEmail);
  }, [currentName, currentEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateProfile(name, email);
      setMessage(data.message);
      if (onSuccess) onSuccess(); 
      setError('');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className={styles.successAlert}>{message}</div>}
      {error && <div className={styles.errorAlert}>{error}</div>}
      
      <div className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input 
          id="name" 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className={styles.input}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>Email Address</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={styles.input}
        />
      </div>

      <button type='submit' disabled={loading} className={styles.primaryButton}>
        {loading ? 'Saving...' : 'Update Profile'}
      </button>
    </form>
  );
}
export default UpdateProfileForm;
