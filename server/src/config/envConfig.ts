import "dotenv/config";

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

const envConfig = {
  PORT: getEnvVariable("PORT"),
  DB_URL: getEnvVariable("DB_URL"),
}
export default envConfig;