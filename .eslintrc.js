module.exports = {
    root: true,
    extends: [
        "@react-native-community",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
    },
};
