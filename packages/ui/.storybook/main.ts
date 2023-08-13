module.exports = {
  stories: ['../ui.stories.tsx', '../**/src/*.stories.tsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    {
      name: 'storybook-addon-turbo-build',
      options: {
        optimizationLevel: 2,
        esbuildMinifyOptions: { target: 'es2019' },
      },
    },
  ],
  core: {
    disableTelemetry: true,
  },
}
