#!/usr/bin/env zx
import * as fs from 'fs';
import { chalk } from 'zx';
import TypeDoc from 'typedoc';

async function getListOfEntryPoints() {
  const packages = await fs.promises.readdir('./src/lib');

  return Promise.all(
    packages
      .filter(async (pkg) => {
        const stat = await fs.promises.stat(`./src/lib/${pkg}`);
        return stat.isDirectory();
      })
      .map(async (pkg) => {
        const isIndex = await fs.promises
          .stat(`./src/lib/${pkg}/index.ts`)
          .then(() => true)
          .catch(() => false);

        return isIndex ? `src/lib/${pkg}/index.ts` : `src/lib/${pkg}/${pkg}.ts`;
      }),
  );
}

try {
  console.log(chalk.cyan('Generating documentation'));

  const entryPointList = await getListOfEntryPoints();

  // Application.bootstrap also exists, which will not load plugins
  // Also accepts an array of option readers if you want to disable
  // TypeDoc's tsconfig.json/package.json/typedoc.json option readers
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: entryPointList,
    exclude: ['**/node_modules/**', '**/*+(index|.spec|.e2e).ts'],
    tsconfig: 'tsconfig.esm.json',
    excludeExternals: true,
    readme: 'README.md',
  });

  const project = await app.convert();

  if (project) {
    // Project may not have converted correctly
    const outputDir = 'docs';

    // Rendered docs
    await app.generateDocs(project, outputDir);
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
