import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    verbose: true,
    automock: false,
    clearMocks: true,
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageProvider: "v8",
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: ["js", "ts"],
    roots: ["tests"],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)",
    ],
    testPathIgnorePatterns: ["/node_modules/"],
    transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
    silent: true,
    detectOpenHandles: true,
};
export default config;
