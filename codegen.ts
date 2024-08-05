import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/',

  generates: {
    'types.ts': {
      plugins: ['typescript'],
    },
  },
};
export default config;
