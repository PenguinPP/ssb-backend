export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Spice Spice Baby Application Server",
    description: "App server for SSB recipe app",
  },
  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Local server",
    },
  ],
};
