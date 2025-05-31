import NotFound from "./pages/NotFound";

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-nested': {},
    'postcss-custom-properties': {
      preserve: false, // Set to true if you want to keep the original custom properties
    },
    'postcss-preset-env': {
      stage: 1, // Enable stage 1 features
      features: {
        'nesting-rules': true, // Enable nesting rules
        'custom-properties': true, // Enable custom properties
      },
    },
    'postcss-import': {},
    'postcss-flexbugs-fixes': {},
    'postcss-normalize': {
      forceImport: true, // Force import of normalize.css
    },
    'postcss-color-function': {},
    'postcss-media-minmax': {},
    'postcss-hexrgba': {},
    'postcss-calc': {
      precision: 5, // Set precision for calc() function
    },
    'postcss-pxtorem': {
      rootValue: 16, // Base font size for rem conversion
      propList: ['*'], // Properties to convert to rem
      unitPrecision: 5, // Precision for rem values
      replace: true, // Replace px with rem
      mediaQuery: false, // Do not convert in media queries
      minPixelValue: 0, // Minimum pixel value to convert
    },
    'postcss-viewport-height-correction': {
      force: true, // Force correction for viewport height
    },
    'postcss-viewport-units': {
      silence: true, // Suppress warnings
    },
    'postcss-rtl': {
      replace: true, // Replace original styles with RTL styles
      dir: 'rtl', // Set direction to RTL
    },
    'postcss-mixins': {
      mixinsDir: './src/styles/mixins', // Directory for mixins
    },
    'postcss-utilities': {
      utilities: ['clearfix', 'hidden'], // Enable specific utilities
    },
    'postcss-responsive-type': {
      breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      }, // Define breakpoints for responsive type
    },
    'postcss-aspect-ratio': {
      preserve: true, // Preserve aspect ratio styles
    },
    'postcss-image-set-polyfill': {
      polyfill: true, // Enable polyfill for image-set
      preserve: true, // Preserve original image styles
    },  
  },
}
