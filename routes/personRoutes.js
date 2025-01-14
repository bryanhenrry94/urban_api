const express = require('express');
const { createPerson, getPeople, getPerson, updatePerson, deletePerson } = require('../controllers/personController');
const router = express.Router();

router.post('/', createPerson);
router.get('/', getPeople)
router.get('/:_id', getPerson);
router.put('/:_id', updatePerson);
router.delete('/:_id', deletePerson);

module.exports = router;
