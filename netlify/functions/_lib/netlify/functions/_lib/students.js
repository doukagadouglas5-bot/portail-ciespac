// Base de données de démonstration — en production, remplacer par une vraie base
// alimentée par l'administration du CIESPAC. Ces données ne sont JAMAIS envoyées
// telles quelles au client : seules les données de l'étudiant authentifié transitent.

const DEMO_EMAIL = "doukagadouglas5@gmail.com";

const STUDENTS = {
  "26LSP08": {
    nom: "DOUKAGA",
    prenom: "Judicaël Douglas",
    dateNaissance: "2004-12-15",
    lieuNaissance: "Kango",
    email: DEMO_EMAIL,
    niveau: "LMD",
    filiere: "Licence 1 — Santé Publique",
    annee: "2025-2026",
    s1: [
      { titre: "UE1 — Bases informatiques", ecues: [
          { nom: "ECUE1-Word,PowerPoint", cc: 13.6, efs: 19.2, moy: 16.96 },
          { nom: "ECUE2-Excel", cc: 15.5, efs: 18.25, moy: 17.2 }
        ], moyUE: 17.1 },
      { titre: "UE2 — Fondamentaux de la santé publique", ecues: [
          { nom: "ECUE1-Concepts de base", cc: 11, efs: 17.6, moy: 14.96 },
          { nom: "ECUE2-Histoire et évolution", cc: 14.5, efs: 18.75, moy: 17.1 }
        ], moyUE: 16.0 },
      { titre: "UE3 — Biologie humaine", ecues: [
          { nom: "ECUE1-Sciences morphologiques", cc: 17.75, efs: 18, moy: 17.9 },
          { nom: "ECUE2-Sciences fonctionnelles", cc: 13, efs: 7.8, moy: 9.7 }
        ], moyUE: 13.8 },
      { titre: "UE4 — Microbiologie", ecues: [
          { nom: "ECUE1-Parasitologie", cc: 14.12, efs: 19.2, moy: 17.17 },
          { nom: "ECUE2-Bactériologie", cc: 16, efs: 16, moy: 16.0 },
          { nom: "ECUE3-Mycologie", cc: 16.5, efs: 19, moy: 18.0 },
          { nom: "ECUE4-Virologie", cc: 17.25, efs: 17.5, moy: 17.4 }
        ], moyUE: 17.1 }
    ],
    s2: [
      { titre: "UE1 — Démographie sanitaire", ecues: [
          { nom: "ECUE1-Notions de base", cc: 14, efs: 16, moy: 15.2 },
          { nom: "ECUE2-Indicateurs démographiques", cc: 15, efs: 17, moy: 16.2 }
        ], moyUE: 15.7 },
      { titre: "UE2 — Géographie de la santé", ecues: [
          { nom: "ECUE1-Cartographie sanitaire", cc: 16, efs: 15, moy: 15.4 },
          { nom: "ECUE2-Risques spatiaux", cc: 13, efs: 14, moy: 13.6 }
        ], moyUE: 14.5 }
    ],
    rattrapage: [
      { titre: "UE3 — Biologie humaine (rattrapage ECUE2)", ecues: [
          { nom: "ECUE2-Sciences fonctionnelles", cc: 13, efs: 12, moy: 12.4 }
        ], moyUE: 15.15 }
    ]
  },

  "26LSP15": {
    nom: "ONGONO",
    prenom: "Anatole Guilaine",
    dateNaissance: "2003-03-22",
    lieuNaissance: "Douala",
    email: DEMO_EMAIL,
    niveau: "LMD",
    filiere: "LIPAM",
    annee: "2025-2026",
    s1: [
      { titre: "UE1 — Bases informatiques", ecues: [
          { nom: "ECUE1-Word,PowerPoint", cc: 12, efs: 14, moy: 13.2 },
          { nom: "ECUE2-Excel", cc: 13, efs: 15, moy: 14.2 }
        ], moyUE: 13.7 },
      { titre: "UE2 — Fondamentaux de la santé publique", ecues: [
          { nom: "ECUE1-Concepts de base", cc: 10, efs: 12, moy: 11.2 },
          { nom: "ECUE2-Histoire et évolution", cc: 11, efs: 13, moy: 12.2 }
        ], moyUE: 11.7 }
    ],
    s2: [
      { titre: "UE1 — Démographie sanitaire", ecues: [
          { nom: "ECUE1-Notions de base", cc: 12, efs: 13, moy: 12.6 },
          { nom: "ECUE2-Indicateurs démographiques", cc: 11, efs: 12, moy: 11.6 }
        ], moyUE: 12.1 }
    ],
    rattrapage: []
  },

  "26LIP04": {
    nom: "OSSINGA",
    prenom: "Ashley Christy",
    dateNaissance: "2002-07-08",
    lieuNaissance: "Libreville",
    email: DEMO_EMAIL,
    niveau: "LIPAM",
    filiere: "MASTER 1 — Santé Publique",
    annee: "2025-2026",
    s1: [
      { titre: "UE1 — Bases informatiques", ecues: [
          { nom: "ECUE1-Word,PowerPoint", cc: 15, efs: 16, moy: 15.6 },
          { nom: "ECUE2-Excel", cc: 14, efs: 17, moy: 15.8 }
        ], moyUE: 15.7 },
      { titre: "UE2 — Fondamentaux de la santé publique", ecues: [
          { nom: "ECUE1-Concepts de base", cc: 13, efs: 15, moy: 14.2 },
          { nom: "ECUE2-Histoire et évolution", cc: 16, efs: 17, moy: 16.6 }
        ], moyUE: 15.4 }
    ],
    s2: [
      { titre: "UE1 — Démographie sanitaire", ecues: [
          { nom: "ECUE1-Notions de base", cc: 15, efs: 16, moy: 15.6 },
          { nom: "ECUE2-Indicateurs démographiques", cc: 14, efs: 15, moy: 14.6 }
        ], moyUE: 15.1 }
    ],
    rattrapage: []
  }
};

function findByIdentity(nom, prenom, dateNaissance) {
  const n = (nom || '').trim().toLowerCase();
  const p = (prenom || '').trim().toLowerCase();
  const d = (dateNaissance || '').trim();
  const entry = Object.entries(STUDENTS).find(([matricule, s]) =>
    s.nom.toLowerCase() === n && s.prenom.toLowerCase() === p && s.dateNaissance === d
  );
  if (!entry) return null;
  const [matricule, student] = entry;
  return { matricule, student };
}

function getByMatricule(matricule) {
  return STUDENTS[matricule] || null;
}

module.exports = { findByIdentity, getByMatricule };
