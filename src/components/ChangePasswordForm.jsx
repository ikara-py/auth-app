import { useState } from 'react';
import { changePassword } from '../api/auth';
import { handleApiError } from '../utils/handleError';
import styles from './UpdateProfileForm.module.css';

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirmation) {
      setError('New passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const data = await changePassword(currentPassword, newPassword, newPasswordConfirmation);
      setMessage(data.message);
      setCurrentPassword(''); setNewPassword(''); setNewPasswordConfirmation('');
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
      {error && <div className={styles.errorText} style={{marginBottom: "15px"}}>{error}</div>}
      
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Current Password</label>
        <input type='password' value={currentPassword}
               onChange={(e) => setCurrentPassword(e.target.value)} 
               placeholder='Enter current password'
               className={styles.input} />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>New Password</label>
        <input type='password' value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)} 
               placeholder='Enter new password'
               className={styles.input} />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Confirm New Password</label>
        <input type='password' value={newPasswordConfirmation}
               onChange={(e) => setNewPasswordConfirmation(e.target.value)} 
               placeholder='Confirm new password'
               className={styles.input} />
      </div>

      <button type='submit' disabled={loading} className={styles.primaryButton}>
        {loading ? 'Updating...' : 'Change Password'}
      </button>
    </form>
  );
}
export default ChangePasswordForm;
