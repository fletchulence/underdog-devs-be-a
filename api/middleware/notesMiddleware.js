const Notes = require('../notes/noteModel');

const checkNoteExists = async (req, res, next) => {
  try {
    const note = await Notes.findBy({ note_id: req.params.note_id });
    if (!note) {
      next({
        status: 404,
        message: 'Note with given ID does not exist',
      });
    } else {
      //appending the already retrieved note to the req body to avoid multiple DB queries
      req.body.retrievedNote = note;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkBodyIsComplete = (req, res, next) => {
  if (
    !req.body.content_type ||
    !req.body.content ||
    !req.body.level ||
    !req.body.visible_to_admin ||
    !req.body.visible_to_moderator ||
    !req.body.visible_to_mentor ||
    !req.body.profile_id_mentor ||
    !req.body.profile_id_mentee
  ) {
    next({
      status: 400,
      message: 'Please include all note data',
    });
  } else {
    next();
  }
};

const checkUpdateInfo = (req, res, next) => {
  if (!req.params.note_id || !req.body) {
    next({
      status: 400,
      message: 'Please include note id and information to be updated',
    });
  } else {
    next();
  }
};

module.exports = {
  checkNoteExists,
  checkBodyIsComplete,
  checkUpdateInfo,
};