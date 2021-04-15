export interface ITag {
  tag_id: String;
  tag_name: String;
}

class Tag implements ITag {
  public tag_id: String;
  public tag_name: String;

  constructor(tag: ITag) {
    this.tag_id = tag.tag_id;
    this.tag_name = tag.tag_name;
  }
}

export default Tag;
