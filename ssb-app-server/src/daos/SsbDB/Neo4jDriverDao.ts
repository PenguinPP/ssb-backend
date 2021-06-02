import { driver, auth } from "neo4j-driver";

const myDriver = driver(
  process.env.NEO4J_URL || "",
  auth.basic(process.env.NEO4J_USER || "", process.env.NEO4J_PASSWORD || "")
);

export default myDriver;
