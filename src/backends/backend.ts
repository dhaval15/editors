
export default interface Backend {
  getContent(params: Map<string, string>): Promise<string>;
  postContent(content: string, params: Map<string, string>): Promise<void>;
  parameterMap: Map<string, string>;
}
