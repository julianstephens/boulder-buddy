/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  semi: true,
  singleQuote: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
