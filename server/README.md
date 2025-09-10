# Mock server to test a questionnaire

To try StromaeDSFR without using a remote server you can use this server

```sh
bun install
bun run dev
```

Then edit `.env.local`

```
VITE_API_URL=http://localhost:3000/
```
