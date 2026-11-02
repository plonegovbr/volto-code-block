// Prism reads this flag when it loads, so this module has to be imported first.
// Without it, Prism schedules its own `highlightAll` when the page loads. Before
// hydration that changes the markup React expects, and after the blocks are
// highlighted it replaces the content of `<code>`, line numbers included.
if (typeof window !== 'undefined') {
  const scope = window as unknown as { Prism?: { manual?: boolean } };
  scope.Prism = scope.Prism || {};
  scope.Prism.manual = true;
}

export {};
