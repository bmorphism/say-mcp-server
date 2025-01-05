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

## Available Voices

Here's a list of all available voices and their languages:

| Voice | Language Code | Sample |
|-------|--------------|----------|
| Albert | en_US | Hello! My name is Albert. |
| Alice | it_IT | Ciao! Mi chiamo Alice. |
| Alva | sv_SE | Hej! Jag heter Alva. |
| Amélie | fr_CA | Bonjour! Je m'appelle Amélie. |
| Amira | ms_MY | Hi my name is Amira |
| Anna | de_DE | Hallo! Ich heiße Anna. |
| Bad News | en_US | Hello! My name is Bad News. |
| Carmit | he_IL | שלום, שמי כרמית. |
| Daniel | en_GB | Hello! My name is Daniel. |
| Daria | bg_BG | Hello! My name is Daria. |
| Ellen | nl_BE | Hallo! Mijn naam is Ellen. |
| Fred | en_US | Hello! My name is Fred. |
| Good News | en_US | Hello! My name is Good News. |
| Jacques | fr_FR | Bonjour, je m'appelle Jacques. |
| Joana | pt_PT | Olá! Chamo‑me Joana. |
| Karen | en_AU | Hi my name is Karen |
| Kyoko | ja_JP | こんにちは! 私の名前はKyokoです。 |
| Lekha | hi_IN | नमस्ते, मेरा नाम लेखा है। |
| Luciana | pt_BR | Olá, meu nome é Luciana. |
| Majed | ar_001 | مرحبًا! اسمي ماجد. |
| Melina | el_GR | Χαίρετε! Το όνομά μου είναι «Μελίνα». |
| Milena | ru_RU | Здравствуйте! Меня зовут Милена. |
| Moira | en_IE | Hello! My name is Moira. |
| Mónica | es_ES | ¡Hola! Me llamo Mónica. |
| Nora | nb_NO | Hei! Jeg heter Nora. |
| Paulina | es_MX | ¡Hola! Me llamo Paulina. |
| Rishi | en_IN | Hello! My name is Rishi. |
| Rocko (Italian (Italy)) | it_IT | Ciao! Mi chiamo Rocko. |
| Samantha | en_US | Hello! My name is Samantha. |
| Sara | da_DK | Hej! Jeg hedder Sara. |
| Satu | fi_FI | Hei! Nimeni on Satu. |
| Sinji | zh_HK | 你好！我叫善怡。 |
| Tessa | en_ZA | Hello! My name is Tessa. |
| Thomas | fr_FR | Bonjour, je m'appelle Thomas. |
| Tingting | zh_CN | Hi my name is Tingting |
| Victoria | en_US | Hello! My name is Victoria. |
| Xander | nl_NL | Hallo! Mijn naam is Xander. |
| Yuna | ko_KR | 안녕하세요. 제 이름은 유나입니다. |
| Zosia | pl_PL | Hi my name is Zosia |
| Zuzana | cs_CZ | Hi my name is Zuzana |

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