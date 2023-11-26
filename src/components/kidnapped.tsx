import React, { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function MyBanner() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://bringthemhomenow.net/1.0.8/hostages-ticker.js';
    script.integrity = 'sha384-jQVW0E+wZK5Rv1fyN+b89m7cYY8txH4s3uShzHf1T51hdBTPo7yKL6Yizgr+Gp8C';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return (
    <Alert severity="info">
      <div id="bthn" />
    </Alert>
  );
}
       