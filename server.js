/* Deine Parameter */
var pfad = '/submit'; // die subdomain auf die das formular sendet (client-seitig)
var schlüssel = 'test123'; // optionaler schlüssel der im Formular gesetzt verden muss
var port = 3000; // standart http port ist 80 also solltest du ihn auch verwenden wenn prodktiv dann
var landingForm = 'formular.html'


/* Pakete */
var express = require('express'); // express server
var fs = require('fs'); // file system (wichtig um auf lokale Dateien zugreifen zu können)
var path = require('path'); // hält alle Pfade absolut (ohne das kann es sein dass man relativ arbeiten muss)
const bodyParser = require('body-parser'); // json-parser für das formular request

/* Einfache Methoden */
function sleep(seconds) { // einfacher sleep timer
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(0);
        }, 1000*seconds);
    });
}

// zuerst initialisieren wir einen express web server
var app = express();

// make static directory (Hauptpfad)
const dir = path.join(__dirname, '/');

// beim aufraufen des hauptpfades lässt den server das formular schicken
app.get('/',function(request, response){
    // wenn du erst mögliche daten haben willst vom filemaker sollte das hier passieren über REST API
    response.sendFile(path.join(dir + '/' + landingForm));
});


/* und wir geben ihm einen asynchronen (threaded) Listener der json pakete auf dem pfad annimmt*/
app.use(bodyParser.json()); // hier sagen wir dem parser dass wir eine json erwarten.
app.post(pfad, async function (request, response) { // standard argumente request (hier sind die daten von der Formularseite drinnen)
    
    // bereite ein leeres Antwortpaket vor
    const antwortJson = {}

    try { // classic try-exception

        const jsonData = request.body; // das ist dein json vom client
        console.log('jsonData:', jsonData) // loggt das json paket in der kommandozeile (damit du siehst was drinnen ist)

        // du kannst jetzt hier das script schreiben
        // zb. kannst du fragen ob im validation feld der user den richtigen Schlüssel
        // angegeben hat, wenn nicht wird der response rejected, ansonsten läuft alles easy
        // sowas ist sehr simpel hier aber kann durchausnützlich sein um Angreifer loszuwerden.
        if (jsonData.validation == schlüssel) {

            // hier musst du nun die daten in jsonData zu der Rest-API leiten

            // geben wir an den Client zurück, dass alles ok ist
            antwortJson['response'] = 'server: received your submit!'
        } else {
            throw Error('Wrong Credentials') // schmeißt einen Fehler der wird dann unten vom catch-block gefangen
        }

        
    } catch (error) {
        console.log('Someone used wrong credentials!')
        antwortJson['response'] = error.toString(); // gebe den fehler weiter an das Antwortpaket

    } finally { // egal ob der try block durchgelaufen ist oder der catch block einen fehler gecatcht hat wird das am Ende sicher durchlaufen
        
        response.send(antwortJson);

    }
    
});

/* hier könnten noch weitere listener stehen die auf anderen Pfaden (zb. /newsletter etc.) zuhören */


// zu guter letzt den server starten
app.listen(port, function () {
    console.log(`app running at http://localhost:${port}`);
});