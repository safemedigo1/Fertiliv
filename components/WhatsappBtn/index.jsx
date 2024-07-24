


// components/WhatsappBtn.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WhatsappBtn = () => {
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
    <div id='google' className="elfsight-app-90870e5a-cb7b-41a8-b728-42eabf12b980" data-elfsight-app-lazy></div >
  );
};

export default WhatsappBtn;
