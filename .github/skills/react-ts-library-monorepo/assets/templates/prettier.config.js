module.exports = {
    // Use ianvs/prettier-plugin-sort-imports if available
    plugins: [],

    // Basic formatting
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
    trailingComma: 'es5',
    printWidth: 100,
    arrowParens: 'always',

    // JSX/TSX specific
    jsxSingleQuote: false,
    bracketSpacing: true,
    bracketSameLine: false,

    // Import sorting (if using @ianvs/prettier-plugin-sort-imports)
    importOrder: [
        '^react$',
        '^react-dom$',
        '^next',
        '<THIRD_PARTY_MODULES>',
        '^@/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,

    // File overrides
    overrides: [
        {
            files: ['*.json', '*.jsonc'],
            options: {
                printWidth: 80,
            },
        },
        {
            files: ['*.md', '*.mdx'],
            options: {
                printWidth: 80,
                proseWrap: 'always',
            },
        },
    ],
};
