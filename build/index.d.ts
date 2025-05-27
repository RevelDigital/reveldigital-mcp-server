#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for revel-digital-rest-api vv1
 * Generated on: 2025-05-26T16:16:40.449Z
 */
/**
 * Server configuration
 */
export declare const SERVER_NAME = "revel-digital-rest-api";
export declare const SERVER_VERSION = "v1";
export declare const API_BASE_URL = "https://api.reveldigital.com";
/**
 * Type definition for cached OAuth tokens
 */
interface TokenCacheEntry {
    token: string;
    expiresAt: number;
}
/**
 * Declare global __oauthTokenCache property for TypeScript
 */
declare global {
    var __oauthTokenCache: Record<string, TokenCacheEntry> | undefined;
}
export {};
