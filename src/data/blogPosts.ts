export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // ISO date string e.g. "2026-04-10"
  category: string;
  readingTime: string;   // e.g. "5 min"
  content: string;       // HTML string — safe, authored internally
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ki-automatisierung-fuer-kleine-unternehmen',
    title: 'Wie KI-Automatisierung kleine Unternehmen wettbewerbsfähig macht',
    excerpt:
      'Viele Inhaber kleiner Betriebe glauben, KI sei nur für Konzerne. Das Gegenteil ist wahr: Gerade KMU profitieren überproportional, weil jede gesparte Arbeitsstunde direkt die Marge verbessert.',
    date: '2026-04-10',
    category: 'KI-Automatisierung',
    readingTime: '5 min',
    content: `
<p>Wenn Geschäftsinhaber das Wort „Künstliche Intelligenz" hören, denken viele sofort an Milliarden-Budgets, eigene Data-Science-Teams und komplizierte IT-Infrastruktur. Die Realität sieht heute anders aus.</p>

<h2>KI ist kein Luxusgut mehr</h2>
<p>Moderne KI-Lösungen sind als Software-as-a-Service verfügbar – Sie zahlen monatlich einen überschaubaren Betrag und bekommen eine fertige Lösung, die Sie in wenigen Tagen einsetzen können. Kein Server, keine Einstellung von Entwicklern, kein langes Implementierungsprojekt.</p>
<p>Ein kleines Handwerksunternehmen mit fünf Mitarbeitern kann heute denselben KI-Chatbot einsetzen, den ein Konzern mit 10.000 Angestellten nutzt – zu einem Bruchteil der Kosten.</p>

<h2>Wo KMU besonders schnell profitieren</h2>
<p>Die größten Gewinne entstehen dort, wo sich Aufgaben täglich wiederholen:</p>
<ul>
  <li><strong>Kundenanfragen</strong>: Ein KI-Chatbot beantwortet 80 % der häufigen Fragen automatisch – rund um die Uhr, ohne Wartezeit.</li>
  <li><strong>Terminbuchungen</strong>: Automatische Bestätigung, Erinnerung und bei Bedarf Verschiebung – ohne manuellen Aufwand.</li>
  <li><strong>Angebotserstellung</strong>: Formulare, die Kundendaten erfassen und ein strukturiertes Angebot vorbereiten, sparen dem Chef täglich 30–60 Minuten.</li>
  <li><strong>Rechnungsstellung</strong>: Automatische Erstellung auf Basis von Auftragsdaten, Versand per E-Mail, Zahlungsverfolgung.</li>
</ul>

<h2>Ein konkretes Beispiel</h2>
<p>Ein Sanitärdienstleister bekommt täglich zwölf Anrufe mit denselben drei Fragen: Sind Sie in meiner Region tätig? Was kostet ein Notfalleinsatz? Wie schnell kommen Sie? Früher hat die Sekretärin jeden Anruf einzeln entgegengenommen. Heute beantwortet ein Voice-Agent diese Fragen und leitet nur echte Aufträge weiter.</p>
<p>Ergebnis: Die Sekretärin hat täglich zwei Stunden mehr für wertschöpfende Arbeit. Das sind 40 Stunden pro Monat – fast eine volle Arbeitswoche.</p>

<h2>Der erste Schritt</h2>
<p>Fangen Sie klein an. Identifizieren Sie eine einzige Aufgabe, die sich täglich wiederholt und die Sie nervt. Dann prüfen Sie, ob KI diese Aufgabe übernehmen kann. Meistens lautet die Antwort: ja.</p>
<p>Wenn Sie wissen möchten, welche Prozesse in Ihrem Betrieb als Erstes automatisiert werden könnten, sprechen Sie uns gerne an. Die erste Beratung ist kostenlos.</p>
    `.trim(),
  },
  {
    slug: 'ki-chatbot-fuer-kmu',
    title: 'KI-Chatbot für KMU: Der 24/7-Vertriebsmitarbeiter der nie schläft',
    excerpt:
      'Ein KI-Chatbot auf Ihrer Website beantwortet Anfragen sofort, qualifiziert Leads automatisch und bucht Erstgespräche – auch nachts um 2 Uhr. Wir zeigen, was heute möglich ist.',
    date: '2026-03-28',
    category: 'Chatbots',
    readingTime: '6 min',
    content: `
<p>Stellen Sie sich vor, Sie hätten einen Mitarbeiter, der nie schläft, nie krank ist und nie schlechte Laune hat. Er beantwortet jede Kundenanfrage innerhalb von Sekunden, kennt Ihr komplettes Leistungsangebot auswendig und bucht Termine direkt in Ihren Kalender. Das ist kein Wunschdenken – das ist ein moderner KI-Chatbot.</p>

<h2>Was ein KI-Chatbot heute kann</h2>
<p>Die Chatbots von vor fünf Jahren waren starre Entscheidungsbäume: Klick auf Option A oder B. Moderne KI-Chatbots basieren auf großen Sprachmodellen (LLMs) und führen echte Gespräche. Sie verstehen Kontext, können nachfragen und lernen aus jeder Interaktion.</p>
<ul>
  <li><strong>Produktfragen beantworten</strong>: Der Chatbot kennt Ihre Dienstleistungen, Preise und FAQs – auf Basis der Informationen, die Sie ihm geben.</li>
  <li><strong>Leads qualifizieren</strong>: Er fragt systematisch nach Budget, Zeitplan und Bedarf und gibt Ihnen strukturierte Informationen, bevor Sie zum Hörer greifen.</li>
  <li><strong>Termine buchen</strong>: Integration mit Calendly, Cal.com oder Ihrem eigenen System – der Chatbot bucht direkt.</li>
  <li><strong>Eskalation erkennen</strong>: Wenn ein Anliegen zu komplex wird, leitet er sauber an einen menschlichen Mitarbeiter weiter.</li>
</ul>

<h2>Warum der Zeitpunkt der Antwort entscheidend ist</h2>
<p>Studien zeigen: Die Wahrscheinlichkeit, einen Lead zu konvertieren, sinkt um 80 %, wenn Sie länger als 5 Minuten mit der Antwort warten. Ein Interessent, der um 22 Uhr auf Ihrer Website landet und eine Frage hat, ist morgen früh bereits bei der Konkurrenz.</p>
<p>Ein KI-Chatbot schließt diese Lücke vollständig. Er antwortet in Sekunden, zu jeder Tageszeit, an jedem Wochentag.</p>

<h2>Was kostet das?</h2>
<p>Ein professionell konfigurierter KI-Chatbot liegt typischerweise bei einer einmaligen Setup-Gebühr von 800–1.500 € und monatlichen Kosten von 80–200 €, je nach Volumen und Funktionsumfang. Vergleichen Sie das mit einem Teilzeitmitarbeiter, der dieselben Aufgaben übernehmen würde – und rechnen Sie dabei auch Urlaubszeiten, Krankheitstage und Einarbeitungszeit mit ein.</p>

<h2>Der Chatbot als Markenbotschafter</h2>
<p>Ein gut konfigurierter Chatbot spricht in Ihrer Markensprache, verwendet Ihre Tonalität und vermittelt das Vertrauen, das Ihre Website aufgebaut hat. Er ist nicht „nur" ein Tool – er ist die erste Stimme, die Ihre Interessenten hören.</p>
<p>Möchten Sie sehen, wie ein solcher Chatbot für Ihr Unternehmen aussehen könnte? Der KI-Experte rechts unten ist ein Beispiel dafür – fragen Sie ihn einfach etwas.</p>
    `.trim(),
  },
  {
    slug: '5-prozesse-die-sie-sofort-automatisieren-koennen',
    title: '5 Geschäftsprozesse, die Sie sofort automatisieren können',
    excerpt:
      'Sie müssen kein Tech-Unternehmen sein, um von Automatisierung zu profitieren. Diese fünf Prozesse lassen sich in fast jedem KMU innerhalb weniger Tage automatisieren – mit messbarem Ergebnis.',
    date: '2026-03-15',
    category: 'Prozessoptimierung',
    readingTime: '7 min',
    content: `
<p>Automatisierung klingt nach großen Projekten und langen Implementierungszeiten. Aber es gibt eine Reihe von Prozessen, die sich schnell, günstig und mit sofortiger Wirkung automatisieren lassen – ohne Ihre IT-Abteilung zu belasten (die Sie wahrscheinlich sowieso nicht haben).</p>

<h2>1. Lead-Erfassung und Follow-up</h2>
<p>Jemand füllt Ihr Kontaktformular aus. Was passiert dann? In vielen Betrieben: die E-Mail landet im Postfach, irgendwann erinnert sich jemand daran, und drei Tage später geht eine Antwort raus. Zu spät.</p>
<p>Automatisierte Lösung: Das Formular löst sofort eine personalisierte Bestätigungs-E-Mail aus, trägt den Kontakt in Ihr CRM ein und erinnert Sie nach 24 Stunden per Benachrichtigung, wenn noch keine Antwort erfolgt ist.</p>

<h2>2. Terminbestätigung und Erinnerungen</h2>
<p>No-Shows kosten bares Geld. Eine automatische Terminerinnerung per E-Mail oder SMS 24 Stunden und 1 Stunde vor dem Termin reduziert No-Shows um bis zu 70 %. Das lässt sich mit Tools wie Cal.com oder durch einen einfachen Workflow in Make (Integromat) umsetzen – in einem Nachmittag.</p>

<h2>3. Rechnungsstellung</h2>
<p>Wenn Sie nach einem abgeschlossenen Auftrag eine Rechnung schreiben, müssen Sie: Kundendaten suchen, Positionen eintragen, PDF erstellen, E-Mail schreiben, Anhang hinzufügen, absenden. Das sind 15–20 Minuten pro Rechnung. Bei zehn Rechnungen pro Monat sind das über drei Stunden.</p>
<p>Automatisierte Lösung: Sie bestätigen den Auftrag als erledigt, der Workflow zieht alle Daten aus Ihrem Auftragssystem, erstellt die Rechnung als PDF und versendet sie. Sie klicken einmal auf „Bestätigen".</p>

<h2>4. Social-Media-Posting</h2>
<p>Regelmäßige Präsenz auf LinkedIn oder Instagram ist für viele Unternehmen wichtig, aber zeitaufwändig. Mit einem einfachen Workflow können Sie Beiträge einmal in der Woche vorplanen und automatisch zum optimalen Zeitpunkt veröffentlichen lassen.</p>

<h2>5. Kundenbewertungen einholen</h2>
<p>Zufriedene Kunden geben selten von sich aus Bewertungen ab – unzufriedene schon. Ein automatisierter Workflow, der 48 Stunden nach Auftragsabschluss eine kurze E-Mail mit der Bitte um eine Google-Bewertung sendet, hat in der Praxis Bewertungsraten von 20–35 % erzielt. Das ist deutlich besser als die durchschnittliche Rate von 2–5 % bei manuellen Nachfragen.</p>

<h2>Wo anfangen?</h2>
<p>Nehmen Sie sich 15 Minuten und schreiben Sie auf, welche Aufgaben Sie heute dreimal oder öfter wiederholt haben. Genau dort liegt Ihr erstes Automatisierungspotenzial. Die meisten dieser Aufgaben lassen sich mit Standard-Tools wie Make, Zapier oder n8n ohne Programmierkenntnisse automatisieren.</p>
<p>Wenn Sie eine strukturierte Analyse Ihrer Prozesse möchten – genau das machen wir in unserem kostenlosen Erstgespräch. Buchen Sie einfach einen Termin.</p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
