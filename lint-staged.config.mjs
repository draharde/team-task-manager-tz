const MAX_FILES_PER_RUN = 20

const quote = (files) => files.map((file) => `"${file}"`).join(' ')

const lintStagedConfig = {
  '*.{ts,tsx}': (files) =>
    files.length > MAX_FILES_PER_RUN
      ? ['eslint --fix --max-warnings=0 .', 'prettier --write "src/**/*.{ts,tsx}"']
      : [`eslint --fix --max-warnings=0 ${quote(files)}`, `prettier --write ${quote(files)}`],
  '*.{css,json,md,mjs,yml}': 'prettier --write',
}

export default lintStagedConfig
