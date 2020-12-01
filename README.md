# Standard eBooks local list

Get repo for loading books:
```bash
git clone https://github.com/standardebooks/web/
cd web/scripts
```

Load books there: 
```bash
./sync-ebooks -v --token 7b5b9f2a7dd9dee846df96b8631308d993d1a6c2 ../www/ebooks
```

Make local list here:
```bash
npm i xml2js
npm run load
npm un xml2js
```

Have to remove `xml2js` module because it interferes with Vite's optimisations.
