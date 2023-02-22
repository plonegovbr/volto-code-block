const MermaidConfig = () => {
  const script = `
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  window.mermaid = mermaid;
  mermaid.initialize(
    { startOnLoad: true }
  );
  `;
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: script,
      }}
    />
  );
};

export default MermaidConfig;
