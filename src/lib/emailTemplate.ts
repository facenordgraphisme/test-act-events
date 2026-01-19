
interface EmailData {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  eventType: string;
  serviceType: string;
  eventDate: string;
  postcode: string;
  guestCount: number;
  venueType: string;
  startTime?: string;
  endTime?: string;
  needs?: string;
}


const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding: "Mariage",
  birthday: "Anniversaire",
  corporate: "Soirée d'entreprise / Séminaire",
  other: "Autre",
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  full: "Formule Complète (DJ + Son + Lumière)",
  dj: "DJ Set Uniquement",
  rental: "Location Matériel Seul",
};

const VENUE_TYPE_LABELS: Record<string, string> = {
  indoor: "Intérieur",
  outdoor: "Extérieur",
};

export function generateEmailHtml(data: EmailData): string {
  const eventTypeFr = EVENT_TYPE_LABELS[data.eventType] || data.eventType;
  const serviceTypeFr = SERVICE_TYPE_LABELS[data.serviceType] || data.serviceType;
  const venueTypeFr = VENUE_TYPE_LABELS[data.venueType] || data.venueType;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px; }
    .header { background-color: #000; color: #D4AF37; padding: 20px; text-align: center; }
    .section { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
    .label { font-weight: bold; color: #666; font-size: 0.9em; }
    .value { margin-top: 5px; font-size: 1.1em; }
    .footer { text-align: center; font-size: 0.8em; color: #999; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouvelle Demande de Devis</h1>
    </div>

    <div class="section">
      <h2>👤 Contact</h2>
      <p>
        <div class="label">Nom complet</div>
        <div class="value">${data.fullName}</div>
      </p>
      <p>
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </p>
      <p>
        <div class="label">Téléphone</div>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </p>
      ${data.city ? `
      <p>
        <div class="label">Ville de résidence</div>
        <div class="value">${data.city}</div>
      </p>` : ''}
    </div>

    <div class="section">
      <h2>🎉 Événement</h2>
      <p>
        <div class="label">Type d'événement</div>
        <div class="value">${eventTypeFr}</div>
      </p>
      <p>
        <div class="label">Date</div>
        <div class="value">${new Date(data.eventDate).toLocaleDateString('fr-FR')}</div>
      </p>
      <p>
        <div class="label">Lieu</div>
        <div class="value">${data.postcode} (${venueTypeFr})</div>
      </p>
      <p>
        <div class="label">Invités</div>
        <div class="value">${data.guestCount} personnes</div>
      </p>
      ${(data.startTime || data.endTime) ? `
      <p>
        <div class="label">Horaires</div>
        <div class="value">${data.startTime || '?'} - ${data.endTime || '?'}</div>
      </p>` : ''}
    </div>

    <div class="section">
      <h2>🎵 Prestation & Besoins</h2>
      <p>
        <div class="label">Type de prestation</div>
        <div class="value">${serviceTypeFr}</div>
      </p>
      ${data.needs ? `
      <p>
        <div class="label">Message / Détails</div>
        <div class="value" style="white-space: pre-wrap;">${data.needs}</div>
      </p>` : ''}
    </div>

    <div class="footer">
      <p>Email généré automatiquement depuis le site web Act Events.</p>
    </div>
  </div>
</body>
</html>
  `;
}
