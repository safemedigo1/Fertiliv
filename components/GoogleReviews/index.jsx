// components/GoogleReviews.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GoogleReviews = () => {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id='google' className="elfsight-app-e73ec678-41ba-4f05-8bfe-78ebad3ef2e4" data-elfsight-app-lazy></div >
  );
};

export default GoogleReviews;
