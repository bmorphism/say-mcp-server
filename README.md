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

| Voice | Language/Region | Intellectual Figure | Haiku | Voice Pronunciation |
|-------|-----------------|---------------------|-------|---------------------|
| Anna (Premium) | German | Emmy Noether | Symmetry breathes life\nAlgebra's hidden forms\nAbstraction blooms | Anna's Voice |
| Emma (Premium) | Italian | Ada Lovelace | Algorithms dance\nMachine whispers secrets soft\nCode becomes alive | Emma's Voice |
| Serena (Premium) | English (UK) | Bertha Swirles | Quantum shadows leap\nMathematics unveils truth\nReality bends | Serena's Voice |
| Yuna (Premium) | Korean | Kim Kyung-won | Hidden patterns gleam\nMind's equations softly bloom\nKnowledge multiplies | Yuna's Voice |
| Alva (Premium) | Swedish | Sonja Korovkin | Topology weaves\nAbstract spaces breathe and dance\nMeaning crystallized | Alva's Voice |
| Amélie (Premium) | French | Sophie Germain | Primes whisper soft myths\nNumbers dance between silence\nSymmetry unfolds | Amélie's Voice |
| Ewa (Premium) | Polish | Maria Wielgus | Logic's tender roots\nMathematical landscapes\nThought's seeds germinate | Ewa's Voice |
| Kiyara (Premium) | Hindi | Shakuntala Devi | Numbers pulse like breath\nCalculation's pure rhythm\nMind becomes the sum | Kiyara's Voice |
| Majed (Premium) | Arabic | Maha Al-Aswad | Equations bloom wide\nInfinite paths intersect\nKnowledge resonates | Majed's Voice |
| Tünde (Premium) | Hungarian | Julia Erdős | Theorems spiral\nMind's intricate patterns flow\nAbstraction takes flight | Tünde's Voice |
| Lesya (Enhanced) | Ukrainian | Olena Voinova | Truth grows quietly\nBetween silence and knowledge\nMind breaks boundaries | Lesya's Voice |
| Yelda (Enhanced) | Turkish | Nihal Büyükaksoy | Symbols dance softly\nMathematics breathes silent\nUnderstanding blooms | Yelda's Voice |
| Milena (Enhanced) | Russian | Olga Ladyzhenskaya | Memory whispers\nEquations flow like rivers\nTruth speaks silently | Milena's Voice |
| Luciana (Enhanced) | Portuguese | Beatriz Costa | Words dance between dreams\nAbstract worlds interweave soft\nKnowledge transforms self | Luciana's Voice |
| Zuzana (Premium) | Czech | Věra Hájková | Power dissolves soft\nHope grows silent and profound\nTruth speaks eloquent | Zuzana's Voice |
| Damayanti (Enhanced) | Indonesian | Sri Pekerti | Voice flows gently now\nBetween national dreaming\nHistory emerges | Damayanti's Voice |
| Dariush (Enhanced) | Persian | Maryam Mirzakhani | Silence blossoms here\nBetween word and mathematics\nWoman liberates | Dariush's Voice |
| Melina (Enhanced) | Greek | Marina Vamvouri | Light whispers secrets\nBetween shadows of knowledge\nPoetry blooms bright | Melina's Voice |
| Linh (Enhanced) | Vietnamese | Nguyễn Thị Xuân | Breath echoes softly\nAmidst spaces of sorrow\nFreedom blooms like wind | Linh's Voice |
| Isabela (Enhanced) | Spanish | Carmen Gómez | Words flow ceaselessly\nBetween myth and reality\nStories are birthed now | Isabela's Voice |
| Carmit (Enhanced) | Hebrew | Tali Seror | Words breathe silently\nBetween lines of deep stillness\nPoem awakening | Carmit's Voice |
| Lekha (Multiple) | Hindi | Neelam Saxena | Revolution streams\nHidden power in language\nFreedom sings its song | Lekha's Voice |
| Kyoko (Japanese) | Japanese | Kazuko Miyamoto | Silence vibrates soft\nBetween dream and perception\nWorld transforms itself | Kyoko's Voice |

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
