# Revel Digital MCP Server

An MCP (Model Context Protocol) server that provides AI assistants with access to the Revel Digital REST API for digital signage management.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI assistants to securely connect to external data sources and tools. MCP allows AI assistants to access real-time data and perform actions through standardized interfaces.

## How it Works with Revel Digital

This MCP server exposes the Revel Digital REST API as tools that AI assistants can use to manage your digital signage infrastructure. Through natural language commands, you can:

- Manage devices, content, and playlists
- Monitor system status and performance
- Configure schedules and automation
- Access analytics and reporting data

This enables conversational control of your digital signage network, making complex management tasks as simple as describing what you want to accomplish.

## Installation

### Prerequisites

- Node.js 20.0.0 or higher
- A Revel Digital account with API access
- API key or OAuth2 credentials for authentication

### Installing in Claude Desktop

1. **Install the MCP server globally:**
   ```bash
   npm install -g @reveldigital/reveldigital-mcp-server
   ```

2. **Configure Claude Desktop** by editing your configuration file:
   
   **On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   **On Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

3. **Add the server configuration:**
   ```json
   {
     "mcpServers": {
       "revel-digital": {
         "command": "npx",
         "args": ["@reveldigital/reveldigital-mcp-server"],
         "env": {
           "API_KEY_APIKEYINHEADER": "your-api-key-here"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop** to load the new MCP server.

### Installing in Other AI Clients

#### Continue.dev
1. Install the package: `npm install -g @reveldigital/reveldigital-mcp-server`
2. Add to your Continue configuration in `.continue/config.json`:
   ```json
   {
     "mcpServers": [
       {
         "name": "revel-digital",
         "command": "npx @reveldigital/reveldigital-mcp-server",
         "env": {
           "API_KEY_APIKEYINHEADER": "your-api-key-here"
         }
       }
     ]
   }
   ```

#### Cody by Sourcegraph
1. Install globally: `npm install -g @reveldigital/reveldigital-mcp-server`
2. Configure in your Cody settings to include the MCP server with appropriate environment variables.

#### Custom Integration
For other AI clients that support MCP, use these connection details:
- **Command:** `npx @reveldigital/reveldigital-mcp-server`
- **Transport:** stdio
- **Environment Variables:** Set `API_KEY_APIKEYINHEADER` with your API credentials

### Authentication Setup

You'll need to obtain API credentials from your Revel Digital account:

1. Log into your Revel Digital dashboard
2. Navigate to Account Information > Developer API
3. Generate an API key
4. Use the key in your MCP server environment configuration

Once configured, you can start asking your AI assistant to help manage your digital signage network!

## Developer Documentation

For complete API reference, authentication details, and advanced configuration options, visit the official Revel Digital developer documentation:

**🔗 [https://developer.reveldigital.com](https://developer.reveldigital.com)**

The developer portal includes:
- Complete REST API documentation
- Authentication and security guidelines
- Code examples and SDKs
- Integration best practices

This documentation will help you understand the full capabilities of the Revel Digital API that this MCP server exposes to your AI assistant.

