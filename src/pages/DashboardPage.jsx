import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../api/auth';
import UpdateProfileForm from '../components/UpdateProfileForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      setUser(data.user || data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) return <div className={styles.loader}>Loading your profile...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.dashboardContainer}>
        
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Dashboard</span>
            <h1 className={styles.title}>Welcome, {user?.name}!</h1>
          </div>
          <button className={styles.logoutBtn} onClick={async () => { await logout(); navigate('/login'); }}>
            Logout
          </button>
        </div>

        <div className={styles.userInfo}>
           <div className={styles.infoRow}>
             <span className={styles.infoLabel}>Email</span>
             <span className={styles.infoValue}>{user?.email}</span>
           </div>
           <div className={styles.infoRow}>
             <span className={styles.infoLabel}>Member Since</span>
             <span className={styles.infoValue}>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
           </div>
        </div>

        <div className={styles.divider} />
        
        <UpdateProfileForm 
          currentName={user?.name} 
          currentEmail={user?.email} 
          onSuccess={fetchProfile} 
        />
        
        <div className={styles.divider} />
        
        <ChangePasswordForm />
        
      </div>
    </div>
  );
}
export default DashboardPage;
