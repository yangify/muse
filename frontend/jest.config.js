export default {
    testEnvironment: "jest-environment-jsdom", // Ensure this matches the installed package
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
};