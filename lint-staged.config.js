module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  '**/*.(ts|tsx|js|jsx)': filenames => [`yarn eslint --fix ${filenames.join(' ')}`],
  '**/*.(css|scss)': filenames => `stylelint --fix ${filenames.join(' ')}`,
};
