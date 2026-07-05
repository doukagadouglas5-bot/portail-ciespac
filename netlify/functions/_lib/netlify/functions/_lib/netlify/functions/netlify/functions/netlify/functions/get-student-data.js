const { verify } = require('./_lib/auth');
const { getByMatricule } = require('./_lib/students');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée.' }) };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const data = verify(token);

  if (!data || !data.matricule) {
    return { statusCode: 401, body: JSON.stringify({ error: "Non authentifié." }) };
  }

  const student = getByMatricule(data.matricule);
  if (!student) {
    return { statusCode: 404, body: JSON.stringify({ error: "Étudiant introuvable." }) };
  }

  const type = (event.queryStringParameters || {}).type || 's1';

  const publicStudent = {
    nom: student.nom,
    prenom: student.prenom,
    matricule: data.matricule,
    niveau: student.niveau,
    filiere: student.filiere,
    annee: student.annee,
    dateNaissance: student.dateNaissance,
    lieuNaissance: student.lieuNaissance
  };

  if (type === 'certificat') {
    return { statusCode: 200, body: JSON.stringify({ student: publicStudent }) };
  }

  const ues = student[type];
  if (!Array.isArray(ues)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Type de document invalide." }) };
  }

  return { statusCode: 200, body: JSON.stringify({ student: publicStudent, ues }) };
};
