const fs = require('fs');
const path = require('path');

const draftsFolder = '/drafts';

exports.listDrafts = (req, res) => {
  try {
    const draftFolders = fs.readdirSync(draftsFolder);

    const drafts = draftFolders.map((folderName) => {
      const metadataFilePath = path.join(draftsFolder, folderName, '.metadata');
      if (fs.existsSync(metadataFilePath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
        return {
          id: folderName,
          title: metadata.title,
          description: metadata.description,
					scenes: metadata.scenes,
        };
      }
    });

    const filteredDrafts = drafts.filter((draft) => draft);

    res.json(filteredDrafts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDraft = (req, res) => {
  const draftId = req.params.id;
  const deep = req.query.deep === 'true';

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const metadataFilePath = path.join(draftFolder, '.metadata');

    if (fs.existsSync(metadataFilePath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      const sceneOrder = metadata.scenes || [];
			if (!deep) {
      	res.json({... metadata, id: draftId});
			} else {
				const scenes = sceneOrder.map((sceneId) => {
					const sceneFilePath = path.join(draftFolder, `${sceneId}.scene`);
					if (fs.existsSync(sceneFilePath)) {
						return {
							id: sceneId,
							content: fs.readFileSync(sceneFilePath, 'utf8'),
						};
					}
				});
				res.json({
					id: draftId,
					title: metadata.title,
					description: metadata.description,
					scenes: scenes,
				});
			}
    } else {
      res.status(404).json({ error: 'Draft not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateDraft = (req, res) => {
  const draftId = req.params.id;
  const updatedMetadata = req.body;

  try {
    const draftFolder = path.join(draftsFolder, draftId);
    const metadataFilePath = path.join(draftFolder, '.metadata');

    if (fs.existsSync(metadataFilePath)) {
      fs.writeFileSync(metadataFilePath, JSON.stringify(updatedMetadata, null, 2), 'utf8');
      res.json({ message: 'Draft updated successfully' });
    } else {
      res.status(404).json({ error: 'Draft not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteDraft = (req, res) => {
  const draftId = req.params.id;

  try {
    const draftFolder = path.join(draftsFolder, draftId);

    if (fs.existsSync(draftFolder)) {
      fs.rmdirSync(draftFolder, { recursive: true });
      res.json({ message: 'Draft deleted successfully' });
    } else {
      res.status(404).json({ error: 'Draft not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createDraft = (req, res) => {
  try {
    const newDraftId = generateUniqueID();
    const newSceneId = generateUniqueID();

    const newDraftFolder = path.join(draftsFolder, newDraftId);
    const newMetadataFilePath = path.join(newDraftFolder, '.metadata');

    fs.mkdirSync(newDraftFolder);
		const metadata = Object.assign({}, req.body);
		Object.assign(metadata, {scenes: [newSceneId]});
    fs.writeFileSync(newMetadataFilePath, JSON.stringify(metadata, null, 2), 'utf8');

		//Empty scene
		const sceneFilePath = path.join(newDraftFolder, `${newSceneId}.scene`);
		fs.writeFileSync(sceneFilePath, "", 'utf8');

    res.status(201).json({ message: 'Draft created successfully', id: newDraftId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateUniqueID() {
  return Math.random().toString(36).substr(2, 9);
}
