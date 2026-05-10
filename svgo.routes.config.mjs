/**
 * SVGO for map routes — stronger size reduction, still screen-safe.
 * - 3 decimal places: imperceptible at ~1440px wide
 * - Strip zoomAndPan/version noise from exporters
 */
export default {
  multipass: true,
  js2svg: {
    pretty: false,
    indent: 0,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertPathData: {
            floatPrecision: 3,
            transformPrecision: 3,
          },
          cleanupNumericValues: {
            floatPrecision: 3,
          },
          mergePaths: {
            force: false,
            floatPrecision: 3,
          },
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['svg:zoomAndPan', 'svg:version'],
      },
    },
  ],
};
