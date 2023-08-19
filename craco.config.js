/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const CracoAlias = require('craco-alias');

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "~/scss/_mixin.scss";
          @import "~/scss/_variable.scss";
        `,
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.json',
      },
    },
  ],
};
