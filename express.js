import express from "express"
import cors from 'cors'
import {exec, spawn} from 'child_process'
import { listenWrapper } from "./src/listen.js";
//import { listenWrapper } from "./src/hi.js"; ///Users/alejandro/VSCodeProjects/Wakey/src/listen.ts
import { promises as fs } from 'fs';

const app = express();
const port = 3001;

//app.use(express.static('public'))
app.use(cors())
app.use(express.json());

async function handleVoice(chatbot) {
  console.log('chatbot:', chatbot)
  exec(`python3 ./src/speech.py "${chatbot}"`)

  while (true) {
    const data = await fs.readFile('res.txt', 'utf8')
    if (data == 'DONE') break
  }
  console.log('AFTER')
  await fs.writeFile('res.txt', 'HELLO', 'utf-8');
}

app.get('/api/listen', async (req, res) => {
  const user = await listenWrapper()
  const data = { user: user };
  res.header("Access-Control-Allow-Origin", "*");
  res.json(data);
});

app.post('/api/speak', async (req, res) => {
  console.log("req:", req.body)
  await handleVoice(req.body.data.text)
  console.log('AT END')
  res.json({})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
