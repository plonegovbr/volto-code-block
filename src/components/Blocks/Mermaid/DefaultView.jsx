import React, { useEffect, useState } from 'react';

const MermaidView = (props) => {
  const { code, block } = props;
  const elementId = `mermaid-${block}`;
  const [mermaid, setMermaid] = useState(null);
  const [svg, setSVG] = useState('');

  useEffect(() => {
    const loadMermaid = async () => {
      const config = {
        startOnLoad: true,
        flowchart: { useMaxWidth: false, htmlLabels: true },
      };
      const { default: mermaid } = await import('mermaid/dist/mermaid.esm.mjs');
      setMermaid(mermaid);
      mermaid.initialize(config);
    };

    loadMermaid();
    return () => {};
  }, []);

  useEffect(() => {
    if (__CLIENT__ && mermaid && elementId && code) {
      const renderSVG = async () => {
        const { svg } = await mermaid.render(elementId, code);
        setSVG(svg);
      };

      renderSVG();
      return () => {};
    }
  }, [mermaid, elementId, code]);

  return (
    <div className={'mermaidWrapper'}>
      {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
    </div>
  );
};

export default MermaidView;
