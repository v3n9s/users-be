import { Configuration } from 'webpack';

export default function ({ ISDEV }: { ISDEV: true | undefined }): Configuration {
  return {
    mode: ISDEV ? 'development' : 'production',
    entry: {
      index: './src/index'
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/i,
          use: ['ts-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '...']
    },
    watch: !!ISDEV,
    output: {
      clean: true
    }
  };
}
