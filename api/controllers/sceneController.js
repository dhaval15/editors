const fs = require('fs');
const path = require('path');

const draftsFolder = '/home/dhaval/drafts';

exports.listScenes = (req, res) => {
  const draftId = req.params.id;

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const metadataFilePath = path.join(draftFolder, '.metadata');

    if (fs.existsSync(metadataFilePath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      const sceneOrder = metadata.scenes || [];

      const scenes = sceneOrder.map((sceneId) => {
        const sceneFilePath = path.join(draftFolder, `${sceneId}.scene`);
        if (fs.existsSync(sceneFilePath)) {
          return {
            id: sceneId,
            content: fs.readFileSync(sceneFilePath, 'utf8'),
          };
        }
      });

      res.json(scenes);
    } else {
      res.status(404).json({ error: 'Draft not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getScene = (req, res) => {
  const draftId = req.params.id;
  const sceneId = req.params.sceneId;

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const sceneFilePath = path.join(draftFolder, `${sceneId}.scene`);

    if (fs.existsSync(sceneFilePath)) {
      const content = fs.readFileSync(sceneFilePath, 'utf8');
      res.json({ id: sceneId, content });
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateScene = (req, res) => {
  const draftId = req.params.id;
  const sceneId = req.params.sceneId;
  const updatedContent = req.body.content;

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const sceneFilePath = path.join(draftFolder, `${sceneId}.scene`);

    if (fs.existsSync(sceneFilePath)) {
      fs.writeFileSync(sceneFilePath, updatedContent, 'utf8');
      res.json({ message: 'Scene updated successfully' });
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteScene = (req, res) => {
  const draftId = req.params.id;
  const sceneId = req.params.sceneId;

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const sceneFilePath = path.join(draftFolder, `${sceneId}.scene`);

    if (fs.existsSync(sceneFilePath)) {
      fs.unlinkSync(sceneFilePath);
      
      const metadataFilePath = path.join(draftFolder, '.metadata');
      if (fs.existsSync(metadataFilePath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
        metadata.scenes = metadata.scenes.filter((id) => id !== sceneId);
        fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf8');
      }

      res.json({ message: 'Scene deleted successfully' });
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createScene = (req, res) => {
  const draftId = req.params.id;
  const insertPosition = req.body.insert;
  const sceneContent = req.body.content;

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const metadataFilePath = path.join(draftFolder, '.metadata');

    if (fs.existsSync(metadataFilePath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      const sceneId = generateUniqueID();

      if (insertPosition !== undefined && insertPosition >= 0 && insertPosition <= metadata.scenes.length) {
        metadata.scenes.splice(insertPosition, 0, sceneId);
      } else {
        metadata.scenes.push(sceneId);
      }

      fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf8');

      const sceneFilePath = path.join(draftFolder, `${sceneId}.scene`);
      fs.writeFileSync(sceneFilePath, sceneContent, 'utf8');

      res.status(201).json({ message: 'Scene created successfully', id: sceneId });
    } else {
      res.status(404).json({ error: 'Draft not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateUniqueID() {
  return Math.random().toString(36).substr(2, 9);
}