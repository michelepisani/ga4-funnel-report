# Report Funnel GA4 per Google Sheets 📊

[![Script Status](https://img.shields.io/badge/status-stable-green)](https://github.com/tuo-utente/nome-progetto)
[![Language](https://img.shields.io/badge/Language-Google%20Apps%20Script-yellow)](https://developers.google.com/apps-script)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Automatizza i report funnel di Google Analytics 4 e visualizzali direttamente su Google Sheets utilizzando l'API ufficiale e Google Apps Script.

![Screenshot dall'interfaccia di GA4](https://github.com/michelepisani/ga4-funnel-report/blob/main/ga4-funnel-report_02_risultato-nell-interfaccia-di-ga4.png)

Questo script risolve la necessità di estrarre e analizzare complesse sequenze di azioni utente (funnel) da **Google Analytics 4** senza dover ricorrere a esportazioni manuali o a strumenti esterni a pagamento. Con una semplice configurazione, puoi definire un funnel personalizzato, suddividerlo per dimensione e ottenere un report chiaro e formattato direttamente nel tuo foglio di calcolo.

![Screenshot del report finale su Google Sheets](https://github.com/michelepisani/ga4-funnel-report/blob/main/ga4-funnel-report_03_risultato-esecuzione-script-in-google-sheets.png)

## 🌟 Caratteristiche Principali

-   **Connessione Diretta**: Si interfaccia con l'**API ufficiale di Google Analytics Data (v1beta)** per dati affidabili e aggiornati.
-   **Funnel Personalizzabili**: Definisci step complessi con logiche `AND`/`OR` direttamente nel codice.
-   **Dati Suddivisi**: Ottieni dati raggruppati per dimensioni come `deviceCategory` (Categoria Dispositivo) o altre a tua scelta.
-   **Automazione Completa**: Esegui lo script manualmente o impostalo per essere eseguito automaticamente tramite trigger temporali.
-   **Output Chiaro**: I risultati vengono formattati in una tabella leggibile, con colonne per il numero di utenti e i tassi di completamento di ogni step.

## 🛠️ Tecnologie Utilizzate

-   **Google Apps Script** (JavaScript)
-   **Google Sheets** come interfaccia di output
-   **Google Analytics Data API v1beta**

## 📦 Installazione e Configurazione

Per utilizzare lo script, segui questi passaggi:

1.  **Crea un Google Sheet**
    -   Vai su [sheets.new](https://sheets.new) e crea un nuovo foglio di calcolo.

2.  **Apri l'Editor di Script**
    -   Dal menu, vai su `Estensioni` > `Apps Script`.
    -   Copia e incolla il codice dallo script (`.js`) fornito in questo repository.

3.  **Abilita l'API di GA4**
    -   Nel menu a sinistra dell'editor, clicca su `Servizi` `+`.
    -   Cerca e aggiungi il servizio **Google Analytics Data API** (v1alpha).

4.  **Configura il tuo ID Proprietà**
    -   All'interno dello script, trova la costante `GA4_PROPERTY_ID` e sostituisci il valore placeholder con l'ID della tua proprietà GA4 (es. `properties/123456789`).

## 🚀 Utilizzo

1.  **Salva** lo script nell'editor.
2.  Dal menu a tendina in alto, seleziona la funzione `creaReportFunnelGA4`.
3.  Clicca su **Esegui**.
4.  La prima volta, ti verrà chiesto di **autorizzare lo script** ad accedere ai tuoi dati di Google Sheets e Google Analytics. Concedi le autorizzazioni.
5.  Al termine dell'esecuzione, torna al tuo foglio di calcolo per visualizzare il report.

## 🤝 Come Contribuire

I contributi sono sempre i benvenuti! Per contribuire:

1.  Fai un Fork del progetto.
2.  Crea un nuovo Branch (`git checkout -b feature/NuovaFunzionalita`).
3.  Fai il Commit delle tue modifiche (`git commit -m 'Aggiungo NuovaFunzionalita'`).
4.  Fai il Push sul Branch (`git push origin feature/NuovaFunzionalita`).
5.  Apri una Pull Request.

## 📜 Licenza

Questo progetto è distribuito con Licenza MIT. Vedi il file `LICENSE` per maggiori informazioni.
