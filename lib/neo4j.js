import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  "neo4j+s://881c33a7.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "qyUHGvnzR6AQ3qR9byZjWj2ELmHn11CO7Lg3Je4KuO0")
);

export async function read(cypher, params = {}) {
  const session = driver.session();

  try {
    const res = await session.executeRead((tx) => tx.run(cypher, params));

    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    await session.close();
  }
}

export async function write(cypher, params = {}) {
  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) => tx.run(cypher, params));

    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    await session.close();
  }
}
