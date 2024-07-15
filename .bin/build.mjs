#!/usr/bin/env zx
import * as fs from 'fs';

async function listPackages(path) {
  return fs.promises.readdir(path);
}

async function generatePackageJsonManifests(options) {
  const packages = await listPackages(options.path);

  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    // Check if the package is a directory
    const stat = await fs.promises.stat(`${options.path}/${pkg}`);
    if (!stat.isDirectory()) {
      continue;
    }
    await $`echo '{"type": "${options.type}"}' > ${options.path}/${pkg}/package.json`;
  }
}

async function getListOfPackages() {
  const packages = await fs.promises.readdir('./src/lib');

  return Promise.all(
    packages.filter(async (pkg) => {
      const stat = await fs.promises.stat(`./src/lib/${pkg}`);
      return stat.isDirectory();
    }),
  );

  return packages;
}

try {
  const packages = await getListOfPackages();

  console.log(
    chalk.cyan(`Starting compilation ${packages.length} will be compiled.`),
  );

  // Clear the dist directory to start fresh build.
  console.log(chalk.cyan('Cleaning dist directory'));
  //await fs.promises.rm('dist', { recursive: true, force: true });

  await $`rm -rf dist`;
  console.log(packages);
  // Compile the esm build into its tmp directory
  console.log(chalk.yellow('Compiling ESM build'));
  await $`npx tsc -p tsconfig.esm.json --outDir dist/tmp/esm`;
  // Compile the cjs build into its tmp directory
  console.log(chalk.yellow('Compiling CJS build'));
  await $`npx tsc -p tsconfig.cjs.json --outDir dist/tmp/cjs`;
  // Compile the types build into its tmp directory
  console.log(chalk.yellow('Compiling Types build'));
  await $`npx tsc -p tsconfig.types.json --outDir dist/tmp/types`;

  // Merge CJS and ESM into one directory
  console.log(chalk.yellow('Merging ESM and CJS builds'));

  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    // create the package directory
    await fs.promises.mkdir(`dist/${pkg}`);
    // Generate the package.json file for the package
    await fs.promises.writeFile(
      `dist/${pkg}/package.json`,
      JSON.stringify(
        {
          module: `esm/${pkg}.js`,
          main: `cjs/${pkg}.js`,
          types: `types/${pkg}.d.ts`,
        },
        null,
        2,
      ),
    );
  }

  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    // Copy directory into the package directory
    await $`cp -r dist/tmp/esm/lib/${pkg} dist/${pkg}/esm`;
    await $`cp -r dist/tmp/cjs/lib/${pkg} dist/${pkg}/cjs`;
    await $`cp -r dist/tmp/types/lib/${pkg} dist/${pkg}/types`;
  }

  // Remove tmp build
  console.log(chalk.cyan('Cleaning tmp build directory'));
  await $`rm -rf dist/tmp`;

  console.log(chalk.cyan('Rebuilding main package.json'));

  const workspacePackageJson = JSON.parse(
    await fs.promises.readFile('package.json', {
      encoding: 'utf-8',
    }),
  );

  const npmPackageJson = {
    name: workspacePackageJson.name,
    description: workspacePackageJson.description,
    version: workspacePackageJson.version,
    author: workspacePackageJson.author,
    keywords: workspacePackageJson.keywords,
    license: workspacePackageJson.license,
    url: workspacePackageJson.url,
    repository: workspacePackageJson.repository,
    dependencies: workspacePackageJson.dependencies,
  };

  await fs.promises.writeFile(
    'dist/package.json',
    JSON.stringify(npmPackageJson, null, 2),
  );

  console.log(chalk.cyan('Copy README.md'));
  await $`cp README.md dist/README.md`;

  console.log(chalk.green('Compilation successful'));
} catch (error) {
  console.error(chalk.red('Compilation failed:'), chalk.red(error.message));
}
