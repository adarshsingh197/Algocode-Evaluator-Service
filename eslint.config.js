export default [
    {
      ignores: ["dist/**"], // Ignore files or directories
      files: ["**/*.js", "**/*.ts"], // Specify files to lint
      languageOptions: {
        ecmaVersion: 2016,
        sourceType: "module",
      },
      rules: {
        "semi": ["error", "always"], // Example rule
      },
      plugins: {
        // Add plugins here if needed
      },
    },
  ];
  