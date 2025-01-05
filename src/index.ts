#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class SayServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'say-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'speak',
          description: 'Use macOS text-to-speech to speak text aloud',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text to speak',
              },
              voice: {
                type: 'string',
                description: 'Voice to use (e.g., "Alex", "Victoria", "Daniel")',
                default: 'Alex',
              },
              rate: {
                type: 'number',
                description: 'Speaking rate (words per minute)',
                minimum: 1,
                maximum: 500,
                default: 175,
              },
              background: {
                type: 'boolean',
                description: 'Run speech in background to unblock further MCP interaction',
                default: false,
              },
            },
            required: ['text'],
          },
        },
        {
          name: 'list_voices',
          description: 'List available text-to-speech voices',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'speak': {
          const { text, voice = 'Alex', rate = 175, background = false } = request.params.arguments as {
            text: string;
            voice?: string;
            rate?: number;
            background?: boolean;
          };

          try {
            await execAsync(`say -v "${voice}" -r ${rate} "${text.replace(/"/g, '\"')}"${background ? ' &' : ''}`);
            return {
              content: [
                {
                  type: 'text',
                  text: `Successfully spoke text using voice "${voice}" at ${rate} words per minute${background ? ' (in background)' : ''}`,
                },
              ],
            };
          } catch (error: any) {
            throw new McpError(
              ErrorCode.InternalError,
              `Failed to speak text: ${error.message}`
            );
          }
        }

        case 'list_voices': {
          try {
            const { stdout } = await execAsync('say -v "?"');
            return {
              content: [
                {
                  type: 'text',
                  text: stdout,
                },
              ],
            };
          } catch (error: any) {
            throw new McpError(
              ErrorCode.InternalError,
              `Failed to list voices: ${error.message}`
            );
          }
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Say MCP server running on stdio');
  }
}

const server = new SayServer();
server.run().catch(console.error);