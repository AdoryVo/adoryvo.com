/** @type {import('prettier').Config} */
export default {
  useTabs: false,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['classMerge'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
