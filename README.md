# say-mcp-server

An MCP server that provides text-to-speech functionality using macOS's built-in `say` command.

## Installation

```bash
npm install say-mcp-server
```

## Tools

### speak

Use macOS text-to-speech to speak text aloud.

Parameters:
- `text` (required): Text to speak
- `voice` (optional): Voice to use (default: "Alex")
- `rate` (optional): Speaking rate in words per minute (default: 175)

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
|-------|--------------|---------|
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
