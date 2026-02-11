import React from 'react';

const Loading = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LocalChefBazaar</h1>

      <div style={styles.loader}>
        <span style={{ ...styles.dot, animationDelay: '0s' }}></span>
        <span style={{ ...styles.dot, animationDelay: '0.2s' }}></span>
        <span style={{ ...styles.dot, animationDelay: '0.4s' }}></span>
      </div>

      <p style={styles.text}>Fresh food is loading...</p>

      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: '20px',
  },
  loader: {
    display: 'flex',
    gap: '10px',
  },
  dot: {
    width: '14px',
    height: '14px',
    backgroundColor: '#f97316',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  text: {
    marginTop: '20px',
    color: '#4b5563',
    fontSize: '14px',
  },
};

export default Loading;
