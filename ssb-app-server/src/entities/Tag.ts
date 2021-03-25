export interface ITag {
  tag_name: String;
}

class Tag implements ITag {
  public tag_name: String;

  constructor(tag: ITag) {
    this.tag_name = tag.tag_name;
  }
}

export default Tag;
