# say-mcp-server

An MCP server that provides text-to-speech functionality using macOS's built-in `say` command.

## Installation

```bash
npm install say-mcp-server
```

## Tools

### speak

The `speak` tool provides access to macOS's text-to-speech capabilities with extensive customization options.

#### Basic Usage

Use macOS text-to-speech to speak text aloud.

Parameters:
- `text` (required): Text to speak. Supports:
  - Plain text
  - Basic punctuation for pauses
  - Newlines for natural breaks
  - [[slnc 500]] for 500ms silence
  - [[rate 200]] for changing speed mid-text
  - [[volm 0.5]] for changing volume mid-text
  - [[emph +]] and [[emph -]] for emphasis
  - [[pbas +10]] for pitch adjustment
- `voice` (optional): Voice to use (default: "Alex")
- `rate` (optional): Speaking rate in words per minute (default: 175, range: 1-500)
- `background` (optional): Run speech in background to allow further MCP interaction (default: false)

#### Advanced Features

1. Voice Modulation:
```typescript
use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: "[[volm 0.7]] This is quieter [[volm 1.0]] and this is normal [[volm 1.5]] and this is louder",
    voice: "Victoria"
  }
});
```

2. Dynamic Rate Changes:
```typescript
use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: "Normal speed [[rate 300]] now speaking faster [[rate 100]] and now slower",
    voice: "Fred"
  }
});
```

3. Emphasis and Pitch:
```typescript
use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: "[[emph +]] Important point! [[emph -]] [[pbas +10]] Higher pitch [[pbas -10]] Lower pitch",
    voice: "Samantha"
  }
});
```

#### Integration Examples

1. With Marginalia Search:
```typescript
// Search for a topic and have the results read aloud
const searchResult = await use_mcp_tool({
  server_name: "marginalia-mcp-server",
  tool_name: "search",
  arguments: { query: "quantum computing basics", count: 1 }
});

await use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: searchResult.results[0].description,
    voice: "Daniel",
    rate: 150
  }
});
```

2. With YouTube Transcripts:
```typescript
// Read a YouTube video transcript
const transcript = await use_mcp_tool({
  server_name: "youtube-transcript",
  tool_name: "get_transcript",
  arguments: {
    url: "https://youtube.com/watch?v=example",
    lang: "en"
  }
});

await use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: transcript.text,
    voice: "Samantha",
    rate: 175
  }
});
```

3. Background Speech with Multiple Actions:
```typescript
// Start long speech in background
await use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: "This is a long speech that will run in the background...",
    voice: "Rocko (Italian (Italy))",
    rate: 69,
    background: true
  }
});

// Immediately perform another action while speech continues
await use_mcp_tool({
  server_name: "marginalia-mcp-server",
  tool_name: "search",
  arguments: { query: "parallel processing" }
});
```

4. With Apple Notes:
```typescript
// Read notes aloud
const notes = await use_mcp_tool({
  server_name: "apple-notes-mcp",
  tool_name: "search-notes",
  arguments: { query: "meeting notes" }
});

if (notes.length > 0) {
  await use_mcp_tool({
    server_name: "say",
    tool_name: "speak",
    arguments: {
      text: notes[0].content,
      voice: "Karen",
      rate: 160
    }
  });
}
```

Example:
```typescript
use_mcp_tool({
  server_name: "say",
  tool_name: "speak",
  arguments: {
    text: "Hello, world!",
    voice: "Victoria",
    rate: 200
  }
});
```

### list_voices

List all available text-to-speech voices on the system.

Example:
```typescript
use_mcp_tool({
  server_name: "say",
  tool_name: "list_voices",
  arguments: {}
});
```

## Recommended Voices

<table>
<tr>
<th>Voice</th>
<th>Language/Region</th>
<th>Intellectual Figure</th>
<th>Haiku</th>
<th>Voice Pronunciation</th>
</tr>
<tr>
<td>Anna (Premium)</td>
<td>German</td>
<td>Emmy Noether</td>
<td>Symmetrie haucht Leben<br>Algebras verborgne Form<br>Abstraktion blüht<br><br><i>Symmetry breathes life<br>Algebra's hidden forms<br>Abstraction blooms</i></td>
<td>Anna's Voice</td>
</tr>
<tr>
<td>Emma (Premium)</td>
<td>Italian</td>
<td>Ada Lovelace</td>
<td>Algoritmi in danza<br>Macchina sussurra dolce<br>Il codice vive<br><br><i>Algorithms dance<br>Machine whispers secrets soft<br>Code becomes alive</i></td>
<td>Emma's Voice</td>
</tr>
<tr>
<td>Yuna (Premium)</td>
<td>Korean</td>
<td>Kim Kyung-won</td>
<td>숨은 패턴 빛나고<br>마음의 방정식 핀다<br>지식 자라나<br><br><i>Hidden patterns gleam<br>Mind's equations softly bloom<br>Knowledge multiplies</i></td>
<td>Yuna's Voice</td>
</tr>
<tr>
<td>Amélie (Premium)</td>
<td>French</td>
<td>Sophie Germain</td>
<td>Nombres premiers murmurent<br>Dansent entre les silences<br>Symétrie s'ouvre<br><br><i>Prime numbers whisper<br>Dancing between the silence<br>Symmetry unfolds</i></td>
<td>Amélie's Voice</td>
</tr>
<tr>
<td>Ewa (Premium)</td>
<td>Polish</td>
<td>Maria Wielgus</td>
<td>Logiki korzenie<br>Matematyczne krainy<br>Myśl kiełkująca<br><br><i>Logic's tender roots<br>Mathematical landscapes<br>Thought's seeds germinate</i></td>
<td>Ewa's Voice</td>
</tr>
<tr>
<td>Kyoko (Japanese)</td>
<td>Japanese</td>
<td>Kazuko Miyamoto</td>
<td>静寂揺れる<br>夢と認識の<br>間で世界が変わる<br><br><i>Silence vibrates soft<br>Between dream and perception<br>World transforms itself</i></td>
<td>Kyoko's Voice</td>
</tr>
<tr>
<td>Milena (Enhanced)</td>
<td>Russian</td>
<td>Olga Ladyzhenskaya</td>
<td>Память шепчет нам<br>Уравнения текут<br>Истина молчит<br><br><i>Memory whispers<br>Equations flow like rivers<br>Truth speaks silently</i></td>
<td>Milena's Voice</td>
</tr>
<tr>
<td>Carmit (Enhanced)</td>
<td>Hebrew</td>
<td>Tali Seror</td>
<td>מילים נושמות בשקט<br>בין שורות של דממה<br>שיר מתעורר<br><br><i>Words breathe silently<br>Between lines of deep stillness<br>Poem awakening</i></td>
<td>Carmit's Voice</td>
</tr>
</table>

## Configuration

Add the following to your MCP settings configuration file:

```json
{
  "mcpServers": {
    "say": {
      "command": "node",
      "args": ["/path/to/say-mcp-server/build/index.js"]
    }
  }
}
```

## Requirements

- macOS (uses the built-in `say` command)
- Node.js >= 14.0.0

## Contributors

- Barton Rhodes ([@bmorphism](https://github.com/bmorphism)) - barton@vibes.lol

## License

MIT
