import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';

const voltoDir = path.resolve(__dirname, '../../core/packages/volto');

const aliases = {
  '@plone/volto': path.join(voltoDir, 'src'),
  '@plonegovbr/volto-code-block': path.resolve(__dirname, './src'),
};

// Volto's webpack also looks up bare imports (`@loadable/component`,
// `classnames`, ...) in Volto's own node_modules. pnpm does not expose them
// to this package, so fall back to resolving them from Volto, as webpack does.
const resolveFromVolto = {
  name: 'resolve-from-volto',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (
      !importer ||
      source.startsWith('.') ||
      source.startsWith('\0') ||
      path.isAbsolute(source) ||
      importer.startsWith(voltoDir)
    ) {
      return null;
    }
    const resolved = await this.resolve(source, importer, {
      ...options,
      skipSelf: true,
    });
    if (resolved) {
      return resolved;
    }
    return this.resolve(source, path.join(voltoDir, 'package.json'), {
      ...options,
      skipSelf: true,
    });
  },
};

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    alias: aliases,
  },
  test: {
    ...voltoVitestConfig.test,
    // Volto's own projects carry their own aliases and plugins, so add ours
    // to each one.
    projects: voltoVitestConfig.test.projects.map((project) => ({
      ...project,
      plugins: [resolveFromVolto, ...project.plugins],
      resolve: {
        ...project.resolve,
        alias: { ...project.resolve.alias, ...aliases },
      },
    })),
  },
});
