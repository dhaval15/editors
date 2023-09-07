const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

const draftController = require('./controllers/draftController');

app.get('/drafts', draftController.listDrafts);
app.get('/draft/:id', draftController.getDraft);
app.put('/draft/:id', draftController.updateDraft);
app.delete('/draft/:id', draftController.deleteDraft);
app.post('/draft', draftController.createDraft);

const sceneController = require('./controllers/sceneController');

app.get('/draft/:id/scenes', sceneController.listScenes);
app.get('/draft/:id/scene/:sceneId', sceneController.getScene);
app.put('/draft/:id/scene/:sceneId', sceneController.updateScene);
app.delete('/draft/:id/scene/:sceneId', sceneController.deleteScene);
app.post('/draft/:id/scenes', sceneController.createScene);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
