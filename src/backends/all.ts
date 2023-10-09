import Backend from './backend'
import ReNotesBackend from './renotes-backend.ts'

const backends = new Map<string, Backend>();
backends.set('renotes', new ReNotesBackend());

export default backends;

