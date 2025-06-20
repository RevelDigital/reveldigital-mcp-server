# OAuth2 Configuration

This API uses OAuth2 for authentication. The MCP server can handle OAuth2 authentication in the following ways:

1. **Using a pre-acquired token**: You provide a token you've already obtained
2. **Using client credentials flow**: The server automatically acquires a token using your client ID and secret

## Environment Variables

### Bearer

**Configuration Variables:**

- `OAUTH_CLIENT_ID_BEARER`: Your OAuth client ID
- `OAUTH_CLIENT_SECRET_BEARER`: Your OAuth client secret
- `OAUTH_TOKEN_BEARER`: Pre-acquired OAuth token (required for authorization code flow)

**Authorization Code Flow:**

- Authorization URL: `https://id.reveldigital.com/connect/authorize`
- Token URL: `https://id.reveldigital.com/connect/token`

**Available Scopes:**

- `webapi`: Web API

## Token Caching

The MCP server automatically caches OAuth tokens obtained via client credentials flow. Tokens are cached for their lifetime (as specified by the `expires_in` parameter in the token response) minus 60 seconds as a safety margin.

When making API requests, the server will:
1. Check for a cached token that's still valid
2. Use the cached token if available
3. Request a new token if no valid cached token exists
