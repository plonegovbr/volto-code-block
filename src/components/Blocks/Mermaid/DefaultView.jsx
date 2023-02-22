import React, { useEffect, useState } from 'react';

const MermaidView = (props) => {
  const { code } = props;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.mermaid) {
      setLoaded(true);
    }
  }, [loaded]);
  useEffect(() => {
    if (loaded && window.mermaid) {
      window.mermaid.contentLoaded();
    }
  }, [loaded, code]);
  return <>{code && <pre className="mermaid">{code}</pre>}</>;
};

export default MermaidView;
