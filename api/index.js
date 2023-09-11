const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3030;
const draftDirectory = process.env.DRAFT_DIRECTORY || '/drafts';

app.use(express.json())
//app.use(cors())
app.use(express.static('/static'))



const draftController = require('./controllers/draftController');

app.get('/api/drafts', draftController.listDrafts);
app.get('/api/draft/:id', draftController.getDraft);
app.put('/api/draft/:id', draftController.updateDraft);
app.delete('/api/draft/:id', draftController.deleteDraft);
app.post('/api/draft', draftController.createDraft);

const sceneController = require('./controllers/sceneController');

app.get('/api/draft/:id/scenes', sceneController.listScenes);
app.get('/api/draft/:id/scene/:sceneId', sceneController.getScene);
app.put('/api/draft/:id/scene/:sceneId', sceneController.updateScene);
app.delete('/api/draft/:id/scene/:sceneId', sceneController.deleteScene);
app.post('/api/draft/:id/scenes', sceneController.createScene);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
