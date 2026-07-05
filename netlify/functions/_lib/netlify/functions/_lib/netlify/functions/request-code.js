const { sign, hashCode } = require('./_lib/auth');
const { findByIdentity } = require('./_lib/students');

function maskEmail(email) {
  const [user, domain] = email.split('@');
  const visible = user.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(user.length - 2, 3))}@${domain}`;
}

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

  const { nom, prenom, dateNaissance } = body;
  const found = findByIdentity(nom, prenom, dateNaissance);

  // Réponse volontairement identique en cas d'échec, pour ne pas révéler
  // quelle partie de l'identité est incorrecte.
  if (!found) {
    return { statusCode: 401, body: JSON.stringify({ error: "Identité non reconnue. Vérifiez le nom, prénom et la date de naissance." }) };
  }

  const { matricule, student } = found;
  const code = String(Math.floor(100 + Math.random() * 900)); // code à 3 chiffres
  const codeHash = hashCode(code);
  const challengeToken = sign({ matricule, codeHash, exp: Date.now() + 10 * 60 * 1000 });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  if (!RESEND_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Le service d'e-mail n'est pas configuré (RESEND_API_KEY manquant côté serveur)." })
    };
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: student.email,
        subject: 'Votre code de vérification — Portail Étudiant CIESPAC',
        html: `<p>Bonjour ${student.prenom},</p>
               <p>Votre code de vérification pour accéder au portail étudiant CIESPAC est :</p>
               <p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${code}</p>
               <p>Ce code expire dans 10 minutes. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>`
      })
    });

    if (!emailRes.ok) {
      const detail = await emailRes.text();
      return { statusCode: 502, body: JSON.stringify({ error: "Échec de l'envoi de l'e-mail.", detail }) };
    }
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: "Erreur réseau lors de l'envoi de l'e-mail." }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ challengeToken, maskedEmail: maskEmail(student.email) })
  };
};
