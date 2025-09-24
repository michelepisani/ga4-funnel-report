// © 2025 - Codice Definitivo basato sulla struttura JSON corretta

/**
 * CONFIGURAZIONE PRINCIPALE
 * Sostituisci 'TUO_PROPERTY_ID' con l'ID numerico della tua proprietà GA4.
 */
const GA4_PROPERTY_ID = 'properties/TUO_PROPERTY_ID';

/**
 * Funzione principale che viene eseguita per generare il report.
 */
function creaReportFunnelGA4() {
  try {
    const response = fetchFunnelData();
    // Logger.log(JSON.stringify(response, null, 2)); // Puoi decommentare questa riga per vedere il JSON nei log
    
    if (response && response.funnelTable) {
      scriviDatiSulFoglio(response.funnelTable);
      SpreadsheetApp.getUi().alert('Report creato con successo!');
    } else {
      scriviMessaggioNessunDato();
    }
  } catch (e) {
    Logger.log('Errore durante la creazione del report: ' + e.toString());
    SpreadsheetApp.getUi().alert('Si è verificato un errore: ' + e.message);
  }
}

/**
 * Interroga l'API di Google Analytics Data per ottenere i dati del funnel. (Questa funzione è corretta)
 */
function fetchFunnelData() {
  const funnelRequest = {
    dateRanges: [{ startDate: '7daysAgo', endDate: 'yesterday' }],
    funnelBreakdown: { breakdownDimension: { name: 'deviceCategory' } },
    funnel: {
      steps: [
        { name: 'Step 1: Visita Gallery Sconti', filterExpression: { andGroup: { expressions: [{ funnelFieldFilter: { fieldName: 'eventName', stringFilter: { value: 'page_view' } } }, { funnelFieldFilter: { fieldName: 'pageLocation', stringFilter: { matchType: 'CONTAINS', value: '/buoni-sconto/gallery' } } }] } } },
        { name: 'Step 2: Engagement Pagina', filterExpression: { funnelFieldFilter: { fieldName: 'eventName', stringFilter: { value: 'page_engagement' } } } },
        { name: 'Step 3: Inizio Login o Scroll', filterExpression: { orGroup: { expressions: [{ andGroup: { expressions: [{ funnelFieldFilter: { fieldName: 'eventName', stringFilter: { value: 'page_view' } } }, { funnelFieldFilter: { fieldName: 'pageLocation', stringFilter: { matchType: 'CONTAINS', value: '/page-user/login' } } }] } }, { funnelFieldFilter: { fieldName: 'eventName', stringFilter: { value: 'scroll' } } }] } } }
      ]
    }
  };
  return AnalyticsData.Properties.runFunnelReport(funnelRequest, GA4_PROPERTY_ID);
}

/**
 * Scrive i dati formattati nel foglio di calcolo attivo, trasformandoli dalla struttura API.
 */
function scriviDatiSulFoglio(funnelTable) {
  if (!funnelTable.rows || funnelTable.rows.length === 0) {
    scriviMessaggioNessunDato();
    return;
  }

  const processedData = {};
  const stepNames = new Set();

  // 1. Cicla sui dati grezzi e li riorganizza per dispositivo
  funnelTable.rows.forEach(row => {
    const currentStepName = row.dimensionValues[0].value;
    const deviceCategory = row.dimensionValues[1].value;

    // Ignora le righe dei totali
    if (deviceCategory === 'RESERVED_TOTAL') {
      return;
    }

    // Aggiunge lo step alla lista unica di step
    stepNames.add(currentStepName);

    // Inizializza l'oggetto per il dispositivo se non esiste
    if (!processedData[deviceCategory]) {
      processedData[deviceCategory] = {};
    }

    // Estrae e salva le metriche per questo step e dispositivo
    const userCount = row.metricValues[0].value;
    const completionRate = row.metricValues[1].value;
    processedData[deviceCategory][currentStepName] = {
      users: parseInt(userCount, 10),
      rate: (parseFloat(completionRate) * 100).toFixed(2) + '%'
    };
  });

  // 2. Prepara l'output per il foglio di calcolo
  const sortedStepNames = Array.from(stepNames).sort();
  const headers = ['Categoria Dispositivo'];
  sortedStepNames.forEach(name => {
    headers.push(`Utenti - ${name}`, `Tasso Completamento - ${name}`);
  });

  const outputData = [headers];

  // 3. Cicla sui dati processati e costruisce le righe finali
  Object.keys(processedData).sort().forEach(deviceCategory => {
    const rowData = [deviceCategory];
    const deviceSteps = processedData[deviceCategory];

    sortedStepNames.forEach(stepName => {
      if (deviceSteps[stepName]) {
        rowData.push(deviceSteps[stepName].users, deviceSteps[stepName].rate);
      } else {
        // Se un dispositivo non ha dati per uno step, inserisce 0
        rowData.push(0, '0.00%');
      }
    });
    outputData.push(rowData);
  });
  
  // 4. Scrive i dati sul foglio
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.getRange(1, 1, outputData.length, headers.length).setValues(outputData);
  sheet.autoResizeColumns(1, headers.length);
}


/**
 * Funzione helper per scrivere un messaggio quando non ci sono dati.
 */
function scriviMessaggioNessunDato() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.getRange(1, 1).setValue("Nessun dato restituito per il periodo e i filtri selezionati.");
}