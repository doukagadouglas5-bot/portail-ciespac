const { sign, verify, hashCode } = require('./_lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Requête invalide.' }) };
  }

  const { challengeToken, code } = body;
  const data = verify(challengeToken);

  if (!data) {
    return { statusCode: 401, body: JSON.stringify({ error: "Session expirée. Redemandez un code." }) };
  }

  if (hashCode(code) !== data.codeHash) {
    return { statusCode: 401, body: JSON.stringify({ error: "Code incorrect." }) };
  }

  const sessionToken = sign({ matricule: data.matricule, exp: Date.now() + 30 * 60 * 1000 });
  return { statusCode: 200, body: JSON.stringify({ sessionToken }) };
};
