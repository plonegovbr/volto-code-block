import './prismManual';
import Prism from 'prismjs/components/prism-core';

// The only Prism in the add-on. `prismjs` would be a second instance, and each
// instance has its own grammars and plugins. Importing this module first also
// makes it the global `Prism`, where the language components and the plugins
// register themselves.
export default Prism;
