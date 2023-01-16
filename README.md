# Standard ebooks custom list

Alternative interface for awesome website [standardebooks.org](https://standardebooks.org). Just a list of books with some essential info like author, title, description, cover, link to the download page, words count, etc. Also, you can star a book or mark it as read — this data saved locally in your browser. 

## Development
### Run local instance
```shell
yarn dev
```

### Build for prod
```shell
yarn build
```

### Download books
Get repo for loading books and download them:
```shell
git clone https://github.com/standardebooks/web/
cd web/scripts
./sync-ebooks -v --bare --token TOKEN ../www/ebooks
```

Make local list here:
```shell
# cd back to this repo
yarn getbooks
```

After making local list all downloaded book repositories can be deleted:
```shell
cd ../standardebooks.org/web/www/ebooks
rm -rf */
```
