import Backend from './backend';
import axios from 'axios';

export default class ReNotesBackend implements Backend {
	parameterMap: Map<string, string>;

	constructor() {
		this.parameterMap = new Map<string, string>();
		this.parameterMap.set('collection', 'Collection Name');
		this.parameterMap.set('nodeId', 'Node Id');
		this.parameterMap.set('host', 'Host Name');
	}

	async getContent(params: Map<string, string>): Promise<string> {
		const host = params.get('host');
		const collection = params.get('collection');
		const nodeId = params.get('nodeId');
		const content = await axios.get(`${host}/api/content/${collection}/${nodeId}`);
		return content.data['content'];
	}

	async postContent(content: string, params: Map<string, string>): Promise<void> {
		const host = params.get('host');
		const collection = params.get('collection');
		const nodeId = params.get('nodeId');
		await axios.post(`${host}/api/content/${collection}/${nodeId}`, { content });
	}
}
