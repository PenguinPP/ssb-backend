import neo4jDriver from "@daos/SsbDB/Neo4jDriverDao";
import Tag, { ITag } from "@entities/Tag";
import neo4j = require("neo4j-driver");

export interface ITagDao {
  getAll: () => Promise<ITag[]>;
}

class TagDao implements ITagDao {
  public async getAll(): Promise<ITag[]> {
    let session = neo4jDriver.session();

    try {
      let result = await session.run(
        `MATCH (t:Tag)
          RETURN collect(t.name) AS tag_list;`
      );

      return result.records.map((record) => {
        const { tag_name } = record.toObject();
        const tag: Tag = {
          tag_name: tag_name,
        };

        return tag;
      });
    } catch (error) {
      throw error;
    } finally {
      session.close();
    }
  }
}

export default TagDao;
