const baseDir = '<rootDir>/utils/authentication';
const baseTestDir = '<rootDir>/test/Utils';

module.exports = {
    testEnvironment: "node",
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.js`
    ],
    testMatch: [
        `${baseTestDir}/**/*.js`
    ]
};
