import React, { useEffect, useState } from 'react';
import Caption from '../../Caption/Caption';
import cx from 'classnames';

const MermaidView = (props) => {
  const {
    code,
    block,
    styles = {},
    caption_title,
    caption_description,
    className,
  } = props;
  const align = styles?.align || 'center';
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
    <>
      {code && (
        <div className={cx('block mermaid', className, `align-${align}`)}>
          <div className="mermaidWrapper">
            {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
            {caption_title && (
              <Caption
                title={caption_title}
                description={caption_description}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MermaidView;
