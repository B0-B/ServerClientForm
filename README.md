Ich hoffe du hast ne Linux-Maschine wenn ja dann:
Installiere auf dem Server:

```bash
sudo apt install nodejs && sudo apt install npm
```


SONST:
Auf windows musst du den installer von: https://nodejs.org/en/download/ auf den server bringen und dort ausführen. Ebenso für npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm



DANN:
hast du node und npm. Dann wechselst du in das Directory und installierst das Programm und alle dependencies mittels
```bash
npm i
```

den server startest du vom Hauptpfad des Programms aus, mittels
```bash
node server
```