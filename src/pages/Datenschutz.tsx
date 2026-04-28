import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LogoMark } from '../components/Logo';

export function Datenschutz() {
  useEffect(() => {
    document.title = 'Datenschutzerklärung | CL-Solutions';
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://cl-solutions.pro/datenschutz');
    return () => {
      document.title = 'KI-Automatisierung für deutsche Unternehmen | CL-Solutions';
      if (canonical) canonical.setAttribute('href', 'https://cl-solutions.pro/');
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/90 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <LogoMark size={32} />
              <span className="font-syne font-bold text-lg text-white">CL-Solutions</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-inter"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-12">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 font-inter text-gray-400 leading-relaxed">
            <p>
              CL-Solutions nimmt den Schutz Ihrer persönlichen Daten ernst und hält sich
              an die gesetzlichen Regeln des Datenschutzes. Personenbezogene Daten werden
              auf dieser Website nur im technisch notwendigen Umfang erhoben.
              In keinem Fall werden die erhobenen Daten verkauft oder an Dritte weitergegeben.
            </p>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 1 Verantwortlicher
              </h2>
              <p>
                Verantwortlicher gem. Art. 4 Abs. 7 EU-DSGVO ist:<br />
                CL-Solutions GbR<br />
                [Adresse folgt]<br />
                Vertreten durch: Berkay Aksoy & Marios Lysitsas<br />
                E-Mail: webmaster@cl-solutions.pro
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 2 Erhebung personenbezogener Daten
              </h2>
              <p>
                Bei der informatorischen Nutzung unserer Website erheben wir nur die Daten,
                die Ihr Browser an unseren Server übermittelt. Dazu gehören:
                IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp, Betriebssystem
                sowie die aufgerufene Seite.
              </p>
              <p className="mt-4">
                Diese Daten werden ausschließlich zur Sicherstellung des technischen Betriebs
                verwendet und nicht zur Identifikation von Personen genutzt.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 3 Kontaktformular
              </h2>
              <p>
                Bei Nutzung unseres Kontaktformulars werden Name und E-Mail-Adresse
                zur Bearbeitung Ihrer Anfrage gespeichert.
                Die Daten werden nach Abschluss der Anfrage gelöscht.
              </p>
              <p className="mt-4">
                Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. a DSGVO.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 4 Drittanbieter & KI-Tools
              </h2>
              <p>
                Zur Erbringung unserer Leistungen setzen wir externe Dienstleister ein,
                darunter Anbieter von KI-Technologien und Automatisierungstools
                (z.B. OpenAI, Chatbase, Cal.com, Tally, Vapi).
                Diese Anbieter wurden sorgfältig ausgewählt.
              </p>
              <p className="mt-4">
                CL-Solutions haftet nicht für Fehler, Ausfälle oder Datenverluste,
                die durch den Einsatz dieser Drittanbieter entstehen.
              </p>
              <p className="mt-4">
                Der Einsatz KI-basierter Systeme erfolgt nach bestem Wissen.
                Eine Garantie für die Richtigkeit KI-generierter Inhalte kann nicht
                übernommen werden — Nutzer werden darauf hingewiesen,
                KI-Ausgaben kritisch zu prüfen.
              </p>
              <p className="mt-4">
                Soweit Dienstleister ihren Sitz außerhalb des EWR haben,
                informieren wir Sie im Rahmen der jeweiligen Leistungsbeschreibung.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 5 Cookies
              </h2>
              <p>
                Diese Website verwendet technisch notwendige Cookies,
                die für den Betrieb der Website erforderlich sind.
                Es werden keine Tracking- oder Marketing-Cookies eingesetzt.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 6 Datensicherheit
              </h2>
              <p>
                Wir verwenden SSL-Verschlüsselung sowie geeignete technische und
                organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff zu schützen.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 7 Ihre Rechte
              </h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                gemäß Art. 15–18 DSGVO.
              </p>
              <p className="mt-4">
                Zur Ausübung Ihrer Rechte wenden Sie sich an: kontakt@cl-solutions.pro
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 8 Keine Rechts- oder Steuerberatung
              </h2>
              <p>
                CL-Solutions ist eine Digitalagentur und erbringt ausschließlich
                technische Dienstleistungen.
                Wir bieten keine rechtliche oder steuerliche Beratung an.
              </p>
            </section>

            <section>
              <h2 className="font-syne font-semibold text-xl text-white mb-4">
                § 9 Beschwerderecht
              </h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
                Zuständig ist in der Regel die Behörde Ihres Wohnortes oder unseres Firmensitzes.
              </p>
            </section>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mt-8 font-inter"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
