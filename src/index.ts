#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for revel-digital-rest-api vv1
 * Generated on: 2025-08-18T02:29:05.998Z
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/**
 * Type definition for JSON objects
 */
type JsonObject = Record<string, any>;

/**
 * Interface for MCP Tool Definition
 */
interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: any;
    method: string;
    pathTemplate: string;
    executionParameters: { name: string, in: string }[];
    requestBodyContentType?: string;
    securityRequirements: any[];
}

/**
 * Server configuration
 */
export const SERVER_NAME = "revel-digital-rest-api";
export const SERVER_VERSION = "v1";
export const API_BASE_URL = "https://api.reveldigital.com";

/**
 * MCP Server instance
 */
const server = new Server(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { capabilities: { tools: {} } }
);

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([

  ["getaccount", {
    name: "getaccount",
    description: `Gets account details.`,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/account",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putaccount", {
    name: "putaccount",
    description: `Updates an account.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"id":{"type":["string","null"],"description":"The account id"},"name":{"type":["string","null"],"description":"The account name"},"tags":{"type":["string","null"],"description":"Tags associated with this account"},"business_name":{"type":["string","null"],"description":"The business name"},"address_1":{"type":["string","null"],"description":"The address line 1"},"address_2":{"type":["string","null"],"description":"The address line 2"},"city":{"type":["string","null"],"description":"The city"},"state":{"type":["string","null"],"description":"The state"},"postal_code":{"type":["string","null"],"description":"The postal code"},"country":{"type":["string","null"],"description":"The country"},"phone":{"type":["string","null"],"description":"The phone number"},"fax":{"type":["string","null"],"description":"The fax number"},"primary_contact_id":{"type":["string","null"],"description":"The primary contact user id"},"secondary_contact_id":{"type":["string","null"],"description":"The secondary contact user id"},"created_on":{"type":["string","null"],"description":"The created on date","format":"date-time"},"timeZone":{"type":["string","null"],"description":"The time zone"},"logo_url":{"type":["string","null"],"description":"The logo url"}},"additionalProperties":false,"description":"Account"}}},
    method: "put",
    pathTemplate: "/account",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getorganizations", {
    name: "getorganizations",
    description: `Gets organizations.`,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/account/organizations",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdevices", {
    name: "getdevices",
    description: `Gets all devices in an account.`,
    inputSchema: {"type":"object","properties":{"Id":{"type":"string","description":"Unique identifier for the device."},"Take":{"type":"number","format":"int32","description":"Maximum number of items to retrieve in a query."},"Page":{"type":"number","format":"int32","description":"Current page number for paginated results."},"DeviceTypeId":{"type":"string","description":"Unique identifier for the type of device."},"GroupId":{"type":"array","items":{"type":"string"},"description":"List of unique identifiers for media groups to filter by."},"GroupName":{"type":"array","items":{"type":"string"},"description":"Collection of group names to filter by."},"IncludeSnap":{"type":"boolean","description":"Include the snapshot of the currently playing content. JPG format, base64 encoded."},"OrgId":{"type":"string","description":"Unique identifier for an organization to filter by."},"IsOnline":{"type":"boolean","description":"Filter devices by their online status."}}},
    method: "get",
    pathTemplate: "/devices",
    executionParameters: [{"name":"Id","in":"query"},{"name":"Take","in":"query"},{"name":"Page","in":"query"},{"name":"DeviceTypeId","in":"query"},{"name":"GroupId","in":"query"},{"name":"GroupName","in":"query"},{"name":"IncludeSnap","in":"query"},{"name":"OrgId","in":"query"},{"name":"IsOnline","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postdevice", {
    name: "postdevice",
    description: `Registers a new device.`,
    inputSchema: {"type":"object","properties":{"activation_code":{"type":"string","description":"Activation code"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The device name"},"tags":{"type":["string","null"],"description":"Tags associated with this device"},"timeZone":{"type":["string","null"],"description":"The timezone of the device"},"language_code":{"type":["string","null"],"description":"The language code of the device"},"group_id":{"type":["string","null"],"description":"The group id"},"last_service":{"type":["string","null"],"description":"The last service date","format":"date-time"},"mac_address":{"type":["string","null"],"description":"The MAC address of this device, is applicable"},"location":{"type":"object","properties":{"city":{"type":["string","null"],"description":"City"},"state":{"type":["string","null"],"description":"State"},"county":{"type":["string","null"],"description":"County"},"country":{"type":["string","null"],"description":"Country"},"postal_code":{"type":["string","null"],"description":"Postal code"},"address":{"type":["string","null"],"description":"Address"},"latitude":{"type":["number","null"],"description":"Latitude","format":"double"},"longitude":{"type":["number","null"],"description":"Longitude","format":"double"}},"additionalProperties":false},"beacon":{"type":"object","properties":{"distance":{"type":["number","null"],"format":"double"},"calibration":{"type":["number","null"],"format":"double"},"phone":{"type":["string","null"]},"emailAddress":{"type":["string","null"]},"website":{"type":["string","null"]},"devices":{"type":["array","null"],"items":{"type":"string"}},"rating":{"type":["number","null"],"format":"double"},"uuid":{"type":["string","null"]},"major":{"type":["string","null"]},"minor":{"type":["string","null"]},"notification_delay":{"type":["number","null"],"format":"int32"},"instance_id":{"type":["string","null"]},"namespace":{"type":["string","null"]}},"additionalProperties":false}},"additionalProperties":false,"description":"Device"}}},
    method: "post",
    pathTemplate: "/devices",
    executionParameters: [{"name":"activation_code","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdevicebyid", {
    name: "getdevicebyid",
    description: `Gets a device by ID.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device Id"}},"required":["id"]},
    method: "get",
    pathTemplate: "/devices/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putdevice", {
    name: "putdevice",
    description: `Updates a device.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device Id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The device name"},"tags":{"type":["string","null"],"description":"Tags associated with this device"},"timeZone":{"type":["string","null"],"description":"The timezone of the device"},"language_code":{"type":["string","null"],"description":"The language code of the device"},"group_id":{"type":["string","null"],"description":"The group id"},"last_service":{"type":["string","null"],"description":"The last service date","format":"date-time"},"mac_address":{"type":["string","null"],"description":"The MAC address of this device, is applicable"},"location":{"type":"object","properties":{"city":{"type":["string","null"],"description":"City"},"state":{"type":["string","null"],"description":"State"},"county":{"type":["string","null"],"description":"County"},"country":{"type":["string","null"],"description":"Country"},"postal_code":{"type":["string","null"],"description":"Postal code"},"address":{"type":["string","null"],"description":"Address"},"latitude":{"type":["number","null"],"description":"Latitude","format":"double"},"longitude":{"type":["number","null"],"description":"Longitude","format":"double"}},"additionalProperties":false},"beacon":{"type":"object","properties":{"distance":{"type":["number","null"],"format":"double"},"calibration":{"type":["number","null"],"format":"double"},"phone":{"type":["string","null"]},"emailAddress":{"type":["string","null"]},"website":{"type":["string","null"]},"devices":{"type":["array","null"],"items":{"type":"string"}},"rating":{"type":["number","null"],"format":"double"},"uuid":{"type":["string","null"]},"major":{"type":["string","null"]},"minor":{"type":["string","null"]},"notification_delay":{"type":["number","null"],"format":"int32"},"instance_id":{"type":["string","null"]},"namespace":{"type":["string","null"]}},"additionalProperties":false}},"additionalProperties":false,"description":"Device"}},"required":["id"]},
    method: "put",
    pathTemplate: "/devices/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deletedevice", {
    name: "deletedevice",
    description: `Delete a device.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/devices/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["patchdevice", {
    name: "patchdevice",
    description: `Patch a device. Patch allows partial updates by targeting specific properties of the device.
Uses the JSON Patch syntax (http://jsonpatch.com)`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device Id"},"requestBody":{"type":"string","description":"Request body (content type: application/json-patch+json)"}},"required":["id"]},
    method: "patch",
    pathTemplate: "/devices/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json-patch+json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdevicegroups", {
    name: "getdevicegroups",
    description: `Gets device groups in the account.`,
    inputSchema: {"type":"object","properties":{"tree":{"type":"boolean","default":false,"description":"Optional hierarchical data format"},"id":{"type":"string","description":"Optional group id"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"}}},
    method: "get",
    pathTemplate: "/devices/groups",
    executionParameters: [{"name":"tree","in":"query"},{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postdevicegroup", {
    name: "postdevicegroup",
    description: `Create a new device group.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Device group"}}},
    method: "post",
    pathTemplate: "/devices/groups",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putdevicegroup", {
    name: "putdevicegroup",
    description: `Updates a device group.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Group id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Device group"}},"required":["id"]},
    method: "put",
    pathTemplate: "/devices/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deletedevicegroup", {
    name: "deletedevicegroup",
    description: `Group must be empty.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device group Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/devices/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getpingdata", {
    name: "getpingdata",
    description: `Gets device ping data by registration key.`,
    inputSchema: {"type":"object","properties":{"key":{"type":"string","description":"Registration key"}}},
    method: "get",
    pathTemplate: "/devices/pingdata",
    executionParameters: [{"name":"key","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getsnapshot", {
    name: "getsnapshot",
    description: `Gets current snapshot of the device screen.`,
    inputSchema: {"type":"object","properties":{"registrationKey":{"type":"string"}},"required":["registrationKey"]},
    method: "get",
    pathTemplate: "/devices/{registrationKey}/snap",
    executionParameters: [{"name":"registrationKey","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{}]
  }],
  ["getdevicepingdata", {
    name: "getdevicepingdata",
    description: `Gets device ping data by registration key.`,
    inputSchema: {"type":"object","properties":{"registrationKey":{"type":"string"}},"required":["registrationKey"]},
    method: "get",
    pathTemplate: "/devices/{registrationKey}/pingdata",
    executionParameters: [{"name":"registrationKey","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{}]
  }],
  ["postdevicescommands", {
    name: "postdevicescommands",
    description: `Sends a collection of commands to devices.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"array","items":{"type":"object","properties":{"deviceId":{"type":["string","null"]},"commands":{"type":["array","null"],"items":{"type":"object","properties":{"name":{"type":"string","nullable":true},"arg":{"type":"string","nullable":true}},"additionalProperties":false}}},"additionalProperties":false},"description":"Command set"}}},
    method: "post",
    pathTemplate: "/devices/commands",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postdevicecommands", {
    name: "postdevicecommands",
    description: `Sends a collection of commands to a specific device.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device Id"},"requestBody":{"type":"array","items":{"type":"object","properties":{"name":{"type":["string","null"]},"arg":{"type":["string","null"]}},"additionalProperties":false},"description":"Commands"}},"required":["id"]},
    method: "post",
    pathTemplate: "/devices/{id}/commands",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postevent", {
    name: "postevent",
    description: `Create an event associated with a device.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Device Id"},"requestBody":{"type":"object","properties":{"session_id":{"type":["string","null"]},"event_name":{"type":["string","null"]},"properties":{"type":["object","null"],"additionalProperties":{"nullable":true}}},"additionalProperties":false,"description":"Event"}},"required":["id"]},
    method: "post",
    pathTemplate: "/devices/{id}/track",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getmedia", {
    name: "getmedia",
    description: `Gets all media in an account.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Optional Media Id"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"},"group_id":{"type":"array","items":{"type":"string"},"description":"Optional media group Id"},"group_name":{"type":"array","items":{"type":"string"},"description":"Optional group name to filter by"}}},
    method: "get",
    pathTemplate: "/media",
    executionParameters: [{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"},{"name":"group_id","in":"query"},{"name":"group_name","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postmediamultipart", {
    name: "postmediamultipart",
    description: `POST body must be in multipart/form-data format`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"string","description":"Request body (content type: multipart/form-data)"}}},
    method: "post",
    pathTemplate: "/media",
    executionParameters: [],
    requestBodyContentType: "multipart/form-data",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getmediabyid", {
    name: "getmediabyid",
    description: `Gets media item by ID.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Media Id"}},"required":["id"]},
    method: "get",
    pathTemplate: "/media/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putmedia", {
    name: "putmedia",
    description: `Update media asset properties.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Media Id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The media name"},"group_id":{"type":["string","null"],"description":"The group id"},"tags":{"type":["string","null"],"description":"The tags associated with this media"},"advertiser_id":{"type":["string","null"],"description":"The advertiser id. Optional"},"is_shared":{"type":["boolean","null"],"description":"Is this media shared with other accounts"},"start_date":{"type":["string","null"],"description":"The start date for this media","format":"date-time"},"end_date":{"type":["string","null"],"description":"The end date for this media","format":"date-time"}},"additionalProperties":false,"description":"Media request model. Used for creating and updating media"}},"required":["id"]},
    method: "put",
    pathTemplate: "/media/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deletemedia", {
    name: "deletemedia",
    description: `Delete media asset.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/media/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["patchmedia", {
    name: "patchmedia",
    description: `Patch a media item. Patch allows partial updates by targeting specific properties of the schedule.
Uses the JSON Patch syntax (http://jsonpatch.com)`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Media Id"},"requestBody":{"type":"string","description":"Patch update"}},"required":["id"]},
    method: "patch",
    pathTemplate: "/media/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json-patch+json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getmediagroups", {
    name: "getmediagroups",
    description: `Gets media groups.`,
    inputSchema: {"type":"object","properties":{"tree":{"type":"boolean","default":false,"description":"Optional hierarchical data format"},"id":{"type":"string","description":"Optional group id"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"}}},
    method: "get",
    pathTemplate: "/media/groups",
    executionParameters: [{"name":"tree","in":"query"},{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postmediagroup", {
    name: "postmediagroup",
    description: `Create a new media group.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Media group"}}},
    method: "post",
    pathTemplate: "/media/groups",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putmediagroup", {
    name: "putmediagroup",
    description: `Updates a media group.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Group id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Media group"}},"required":["id"]},
    method: "put",
    pathTemplate: "/media/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deletemediagroup", {
    name: "deletemediagroup",
    description: `Group must be empty.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Media group Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/media/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postmediabyfilename", {
    name: "postmediabyfilename",
    description: `POST body should contain raw binary media file`,
    inputSchema: {"type":"object","properties":{"group_id":{"type":"string"},"file_name":{"type":"string"},"shared":{"type":"boolean","default":false,"description":"Optional media sharing"},"start_date":{"type":"string","format":"date-time","description":"Optional start date"},"end_date":{"type":"string","format":"date-time","description":"Optional end date"},"advertiser_id":{"type":"number","format":"int32","description":"Optional advertiser user Id"},"name":{"type":"string","description":"Optional media name. Overrides the uploaded name"},"description":{"type":"string","description":"Optional media tags"}},"required":["group_id","file_name"]},
    method: "post",
    pathTemplate: "/media/{group_id}/{file_name}",
    executionParameters: [{"name":"group_id","in":"path"},{"name":"file_name","in":"path"},{"name":"shared","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"advertiser_id","in":"query"},{"name":"name","in":"query"},{"name":"description","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postmediaimport", {
    name: "postmediaimport",
    description: `Import a file from a URL.`,
    inputSchema: {"type":"object","properties":{"url":{"type":"string","description":"URL of the file to import"},"group_id":{"type":"string","description":"Media group Id"}}},
    method: "post",
    pathTemplate: "/media/import",
    executionParameters: [{"name":"url","in":"query"},{"name":"group_id","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getplaylists", {
    name: "getplaylists",
    description: `Gets all playlists in an account.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Optional playlist Id to filter by"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"},"group_id":{"type":"array","items":{"type":"string"}},"group_name":{"type":"array","items":{"type":"string"}}}},
    method: "get",
    pathTemplate: "/playlists",
    executionParameters: [{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"},{"name":"group_id","in":"query"},{"name":"group_name","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postplaylist", {
    name: "postplaylist",
    description: `Create a new playlist.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"id":{"type":["string","null"],"description":"The playlist id"},"name":{"type":["string","null"],"description":"The playlist name"},"group_name":{"type":["string","null"],"description":"The group name"},"group_id":{"type":["string","null"],"description":"The group id"},"tags":{"type":["string","null"],"description":"The tags associated with this playlist"},"type":{"enum":["Multimedia","Slideshow","Template","Marquee"],"type":"string"},"duration":{"type":["number","null"],"description":"Total duration for this playlist. Used in conjunction with loop policy","format":"int32"},"is_random_start":{"type":["boolean","null"],"description":"Randomize the order of the playlist"},"created_on":{"type":["string","null"],"description":"The date the playlist was created","format":"date-time"},"created_by_id":{"type":["string","null"],"description":"The user id that created the playlist"},"modified_on":{"type":["string","null"],"description":"The date the playlist was last modified","format":"date-time"},"modified_by_id":{"type":["string","null"],"description":"The user id that last modified the playlist"},"sources":{"type":["array","null"],"items":{"type":"object","properties":{"id":{"type":"string","description":"The source id","nullable":true},"name":{"type":"string","description":"The source name","nullable":true},"type":{"enum":["Audio","Command","Flash","Gadget","Image","Pdf","PlaceExchange","Playlist","PowerPoint","Rss","Svg","Template","Text","Twitter","Url","Video","VistarMedia","WebPage","YouTube","VistarMediaEx"],"type":"string"},"sequence":{"type":"integer","description":"The sequence. Lower numbers are displayed first.","format":"int32","nullable":true},"media_id":{"type":"string","description":"The media file id","nullable":true},"template_id":{"type":"string","description":"The template id","nullable":true},"playlist_id":{"type":"string","description":"The playlist id","nullable":true},"value":{"type":"string","description":"The value","nullable":true},"interval":{"type":"integer","description":"The duration in seconds","format":"int32","nullable":true},"media":{"type":"object","properties":{"name":{"type":"string","description":"The media name","nullable":true},"group_id":{"type":"string","description":"The group id","nullable":true},"tags":{"type":"string","description":"The tags associated with this media","nullable":true},"advertiser_id":{"type":"string","description":"The advertiser id. Optional","nullable":true},"is_shared":{"type":"boolean","description":"Is this media shared with other accounts","nullable":true},"start_date":{"type":"string","description":"The start date for this media","format":"date-time","nullable":true},"end_date":{"type":"string","description":"The end date for this media","format":"date-time","nullable":true},"id":{"type":"string","description":"The media id","nullable":true},"group_name":{"type":"string","description":"The group name","nullable":true},"mime_type":{"type":"string","description":"The MIME type for this media","nullable":true},"file_size":{"type":"integer","description":"The file size in bytes","format":"int32"},"file_name":{"type":"string","description":"The file name","nullable":true},"file_url":{"type":"string","description":"The file URL","nullable":true},"thumbnail_url":{"type":"string","description":"The thumbnail URL","nullable":true},"uploaded_on":{"type":"string","description":"The date the media was uploaded","format":"date-time","nullable":true},"uploaded_by_id":{"type":"string","description":"The user id that uploaded the media","nullable":true},"sha_512":{"type":"string","description":"The SHA512 hash of the media file","nullable":true},"width":{"type":"integer","description":"The width of the media","format":"int32","nullable":true},"height":{"type":"integer","description":"The height of the media","format":"int32","nullable":true}},"additionalProperties":false,"description":"Media model"},"loop_policy_type":{"enum":["Default","OverSaturate2x","OverSaturate3x","OverSaturate4x","OverSaturate5x","Random","UnderSaturate2x","UnderSaturate3x","UnderSaturate4x","UnderSaturate5x","Prefill","Postfill","Spreadfill"],"type":"string","description":"Loop policy type determines how a source is to generatively positioned within a loop.\r\nIMPORTANT: Playlist duration must be set for this to take effect. If no playlist duration is specified, then source loop policy should not be assigned."},"conditions":{"type":"array","items":{"type":"object","properties":{"type":{"enum":["AfterDate","AfterTime","Always","BeforeDate","BeforeTime","Command","DateRange","DayOfMonth","DaysOfWeek","DeviceByGroup","DeviceByNestedGroup","DeviceByName","DeviceByTag","DeviceByOrg","Everywhere","GeoLocation","GpsWithinRadius","KeyEvent","MonthOfYear","Motion","Never","Nowhere","PctAdult","PctChild","PctFemale","PctMale","PctSenior","PctYoung","PctYoungAdult","PlaylistByName","PlaylistByTag","SendCommand","SpecificDevice","SpecificPlaylist","SpecificTemplate","SpecificZone","TemplateByName","TemplateByTag","TimeRange","TopicSet","TotalViewersGreaterThan","TotalViewersLessThan","TouchEvent","WeekOfMonth","WeekOfYear"],"type":"string"},"operator":{"enum":["And","Or","AndNot","OrNot"],"type":"string"},"value_1":{"type":"string","description":"Value 1","nullable":true},"value_2":{"type":"string","description":"Value 2","nullable":true},"value_3":{"type":"string","description":"Value 3","nullable":true},"value_4":{"type":"string","description":"Value 4","nullable":true}},"additionalProperties":false},"description":"The conditions for this source","nullable":true}},"additionalProperties":false,"description":"Source model"},"description":"The sources associated with this playlist"}},"additionalProperties":false,"description":"Playlist to create"}}},
    method: "post",
    pathTemplate: "/playlists",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getplaylistbyid", {
    name: "getplaylistbyid",
    description: `Gets a playlist by ID.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Playlist Id"}},"required":["id"]},
    method: "get",
    pathTemplate: "/playlists/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putplaylist", {
    name: "putplaylist",
    description: `Put a playlist. Replaces a playlist with the one provided.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Playlist Id"},"requestBody":{"type":"object","properties":{"id":{"type":["string","null"],"description":"The playlist id"},"name":{"type":["string","null"],"description":"The playlist name"},"group_name":{"type":["string","null"],"description":"The group name"},"group_id":{"type":["string","null"],"description":"The group id"},"tags":{"type":["string","null"],"description":"The tags associated with this playlist"},"type":{"enum":["Multimedia","Slideshow","Template","Marquee"],"type":"string"},"duration":{"type":["number","null"],"description":"Total duration for this playlist. Used in conjunction with loop policy","format":"int32"},"is_random_start":{"type":["boolean","null"],"description":"Randomize the order of the playlist"},"created_on":{"type":["string","null"],"description":"The date the playlist was created","format":"date-time"},"created_by_id":{"type":["string","null"],"description":"The user id that created the playlist"},"modified_on":{"type":["string","null"],"description":"The date the playlist was last modified","format":"date-time"},"modified_by_id":{"type":["string","null"],"description":"The user id that last modified the playlist"},"sources":{"type":["array","null"],"items":{"type":"object","properties":{"id":{"type":"string","description":"The source id","nullable":true},"name":{"type":"string","description":"The source name","nullable":true},"type":{"enum":["Audio","Command","Flash","Gadget","Image","Pdf","PlaceExchange","Playlist","PowerPoint","Rss","Svg","Template","Text","Twitter","Url","Video","VistarMedia","WebPage","YouTube","VistarMediaEx"],"type":"string"},"sequence":{"type":"integer","description":"The sequence. Lower numbers are displayed first.","format":"int32","nullable":true},"media_id":{"type":"string","description":"The media file id","nullable":true},"template_id":{"type":"string","description":"The template id","nullable":true},"playlist_id":{"type":"string","description":"The playlist id","nullable":true},"value":{"type":"string","description":"The value","nullable":true},"interval":{"type":"integer","description":"The duration in seconds","format":"int32","nullable":true},"media":{"type":"object","properties":{"name":{"type":"string","description":"The media name","nullable":true},"group_id":{"type":"string","description":"The group id","nullable":true},"tags":{"type":"string","description":"The tags associated with this media","nullable":true},"advertiser_id":{"type":"string","description":"The advertiser id. Optional","nullable":true},"is_shared":{"type":"boolean","description":"Is this media shared with other accounts","nullable":true},"start_date":{"type":"string","description":"The start date for this media","format":"date-time","nullable":true},"end_date":{"type":"string","description":"The end date for this media","format":"date-time","nullable":true},"id":{"type":"string","description":"The media id","nullable":true},"group_name":{"type":"string","description":"The group name","nullable":true},"mime_type":{"type":"string","description":"The MIME type for this media","nullable":true},"file_size":{"type":"integer","description":"The file size in bytes","format":"int32"},"file_name":{"type":"string","description":"The file name","nullable":true},"file_url":{"type":"string","description":"The file URL","nullable":true},"thumbnail_url":{"type":"string","description":"The thumbnail URL","nullable":true},"uploaded_on":{"type":"string","description":"The date the media was uploaded","format":"date-time","nullable":true},"uploaded_by_id":{"type":"string","description":"The user id that uploaded the media","nullable":true},"sha_512":{"type":"string","description":"The SHA512 hash of the media file","nullable":true},"width":{"type":"integer","description":"The width of the media","format":"int32","nullable":true},"height":{"type":"integer","description":"The height of the media","format":"int32","nullable":true}},"additionalProperties":false,"description":"Media model"},"loop_policy_type":{"enum":["Default","OverSaturate2x","OverSaturate3x","OverSaturate4x","OverSaturate5x","Random","UnderSaturate2x","UnderSaturate3x","UnderSaturate4x","UnderSaturate5x","Prefill","Postfill","Spreadfill"],"type":"string","description":"Loop policy type determines how a source is to generatively positioned within a loop.\r\nIMPORTANT: Playlist duration must be set for this to take effect. If no playlist duration is specified, then source loop policy should not be assigned."},"conditions":{"type":"array","items":{"type":"object","properties":{"type":{"enum":["AfterDate","AfterTime","Always","BeforeDate","BeforeTime","Command","DateRange","DayOfMonth","DaysOfWeek","DeviceByGroup","DeviceByNestedGroup","DeviceByName","DeviceByTag","DeviceByOrg","Everywhere","GeoLocation","GpsWithinRadius","KeyEvent","MonthOfYear","Motion","Never","Nowhere","PctAdult","PctChild","PctFemale","PctMale","PctSenior","PctYoung","PctYoungAdult","PlaylistByName","PlaylistByTag","SendCommand","SpecificDevice","SpecificPlaylist","SpecificTemplate","SpecificZone","TemplateByName","TemplateByTag","TimeRange","TopicSet","TotalViewersGreaterThan","TotalViewersLessThan","TouchEvent","WeekOfMonth","WeekOfYear"],"type":"string"},"operator":{"enum":["And","Or","AndNot","OrNot"],"type":"string"},"value_1":{"type":"string","description":"Value 1","nullable":true},"value_2":{"type":"string","description":"Value 2","nullable":true},"value_3":{"type":"string","description":"Value 3","nullable":true},"value_4":{"type":"string","description":"Value 4","nullable":true}},"additionalProperties":false},"description":"The conditions for this source","nullable":true}},"additionalProperties":false,"description":"Source model"},"description":"The sources associated with this playlist"}},"additionalProperties":false,"description":"Playlist"}},"required":["id"]},
    method: "put",
    pathTemplate: "/playlists/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deleteplaylist", {
    name: "deleteplaylist",
    description: `Delete a playlist.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Playlist Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/playlists/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["patchplaylist", {
    name: "patchplaylist",
    description: `Patch a playlist. Patch allows partial updates by targeting specific properties of the playlist.
Uses the JSON Patch syntax (http://jsonpatch.com)`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Playlist Id"},"requestBody":{"type":"string","description":"Patch document"}},"required":["id"]},
    method: "patch",
    pathTemplate: "/playlists/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json-patch+json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getplaylistgroups", {
    name: "getplaylistgroups",
    description: `Gets playlist groups in the account.`,
    inputSchema: {"type":"object","properties":{"tree":{"type":"boolean","default":false,"description":"Optional hierarchical data format"},"id":{"type":"string","description":"Optional group id"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"}}},
    method: "get",
    pathTemplate: "/playlists/groups",
    executionParameters: [{"name":"tree","in":"query"},{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postplaylistgroup", {
    name: "postplaylistgroup",
    description: `Create a new playlist group.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Playlist group"}}},
    method: "post",
    pathTemplate: "/playlists/groups",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putplaylistgroup", {
    name: "putplaylistgroup",
    description: `Updates a playlist group.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Group id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Device group"}},"required":["id"]},
    method: "put",
    pathTemplate: "/playlists/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deleteplaylistgroup", {
    name: "deleteplaylistgroup",
    description: `Group must be empty.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Playlist group Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/playlists/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getimpressionsbygenderreport", {
    name: "getimpressionsbygenderreport",
    description: `Executes GET /report/adhawk/impressions-by-gender`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"gender":{"type":"array","items":{"type":"string"}},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/impressions-by-gender",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"gender","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getimpressionsbyhourreport", {
    name: "getimpressionsbyhourreport",
    description: `Executes GET /report/adhawk/impressions-by-hour`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/impressions-by-hour",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getimpressionsbyagereport", {
    name: "getimpressionsbyagereport",
    description: `Executes GET /report/adhawk/impressions-by-age`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/impressions-by-age",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdevicedetailreport", {
    name: "getdevicedetailreport",
    description: `Executes GET /report/adhawk/device-detail`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/device-detail",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getgenderdetailreport", {
    name: "getgenderdetailreport",
    description: `Executes GET /report/adhawk/gender-detail`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/gender-detail",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdevicesummaryreport", {
    name: "getdevicesummaryreport",
    description: `Executes GET /report/adhawk/device-summary`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/device-summary",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdeviceheatmapreport", {
    name: "getdeviceheatmapreport",
    description: `Executes GET /report/adhawk/device-heatmap`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/device-heatmap",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getdevicegeolocationreport", {
    name: "getdevicegeolocationreport",
    description: `Executes GET /report/adhawk/device-geolocation`,
    inputSchema: {"type":"object","properties":{"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"metric":{"enum":["PingCount","AverageDwell"],"type":"string","description":"Type of metric to run the report on"},"device_id":{"type":"array","items":{"type":"string"}},"compare_start":{"type":"string","format":"date-time"},"compare_end":{"type":"string","format":"date-time"}}},
    method: "get",
    pathTemplate: "/report/adhawk/device-geolocation",
    executionParameters: [{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"interval","in":"query"},{"name":"metric","in":"query"},{"name":"device_id","in":"query"},{"name":"compare_start","in":"query"},{"name":"compare_end","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getreportbyid", {
    name: "getreportbyid",
    description: `Returns a list of reports available for export.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Optional report id filter"}}},
    method: "get",
    pathTemplate: "/report",
    executionParameters: [{"name":"id","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postreportexport", {
    name: "postreportexport",
    description: `Generate and export a report.`,
    inputSchema: {"type":"object","properties":{"exclude_body":{"type":"boolean","description":"Exclude the generated report body in the response. This report is always available at the URL provided in the X-RevelDigital-GeneratedReportUrl header value."},"requestBody":{"required":["report_id"],"type":"object","properties":{"report_id":{"type":["string","null"],"description":"Report name"},"format":{"enum":["XML","CSV","IMAGE","PDF","EXCEL","WORD","HTML","MHTML"],"type":"string"},"activity_type":{"type":["string","null"],"description":"Activity type"},"interval_type":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"start_date":{"type":["string","null"],"description":"Start date","format":"date-time"},"end_date":{"type":["string","null"],"description":"End date","format":"date-time"},"start_time":{"type":["string","null"],"description":"Start time\r\n\r\nFormat is 'HHmm'","format":"date-time"},"end_time":{"type":["string","null"],"description":"End time\r\n\r\nFormat is 'HHmm'","format":"date-time"},"device_id":{"type":["array","null"],"items":{"type":"string"},"description":"Array of devices by Id to include in report"},"user_id":{"type":["array","null"],"items":{"type":"string"},"description":"Array of users by Id to include in report"},"media_id":{"type":["array","null"],"items":{"type":"string"},"description":"Array of media items by Id to include in report"}},"additionalProperties":false,"description":"Report parameters"}}},
    method: "post",
    pathTemplate: "/report/export",
    executionParameters: [{"name":"exclude_body","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["exportreport", {
    name: "exportreport",
    description: `Executes GET /report/export/{report_id}`,
    inputSchema: {"type":"object","properties":{"report_id":{"type":"string"},"format":{"enum":["XML","CSV","IMAGE","PDF","EXCEL","WORD","HTML","MHTML"],"type":"string"},"activity_type":{"type":"string"},"interval":{"enum":["Minute","Hour","Day","Month"],"type":"string","description":"Duration interval to generate the report for"},"start":{"type":"string","format":"date-time"},"end":{"type":"string","format":"date-time"},"device_id":{"type":"array","items":{"type":"string"}},"user_id":{"type":"array","items":{"type":"string"}},"media_id":{"type":"array","items":{"type":"string"}}},"required":["report_id"]},
    method: "get",
    pathTemplate: "/report/export/{report_id}",
    executionParameters: [{"name":"report_id","in":"path"},{"name":"format","in":"query"},{"name":"activity_type","in":"query"},{"name":"interval","in":"query"},{"name":"start","in":"query"},{"name":"end","in":"query"},{"name":"device_id","in":"query"},{"name":"user_id","in":"query"},{"name":"media_id","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getschedules", {
    name: "getschedules",
    description: `Gets schedules in an account.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Optional schedule Id to filter by"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"},"group_id":{"type":"array","items":{"type":"string"},"description":"Optional schedule group Id"},"group_name":{"type":"array","items":{"type":"string"},"description":"Optional group name to filter by"},"device_id":{"type":"string","description":"Optional schedule Id to filter by"}}},
    method: "get",
    pathTemplate: "/schedules",
    executionParameters: [{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"},{"name":"group_id","in":"query"},{"name":"group_name","in":"query"},{"name":"device_id","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postschedule", {
    name: "postschedule",
    description: `Creates a new schedule.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The name of the schedule"},"group_id":{"type":["string","null"],"description":"The group id to which the schedule belongs"},"tags":{"type":["string","null"],"description":"The tags associated with the schedule"},"monday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Monday.\r\nOnly applicable for Playlist and Template schedules."},"tuesday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Tuesday.\r\nOnly applicable for Playlist and Template schedules."},"wednesday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Wednesday.\r\nOnly applicable for Playlist and Template schedules."},"thursday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Thursday.\r\nOnly applicable for Playlist and Template schedules."},"friday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Friday.\r\nOnly applicable for Playlist and Template schedules."},"saturday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Saturday.\r\nOnly applicable for Playlist and Template schedules."},"sunday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Sunday.\r\nOnly applicable for Playlist and Template schedules."},"start_date":{"type":["string","null"],"description":"The start date for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"end_date":{"type":["string","null"],"description":"The end date for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"start_time":{"type":["string","null"],"description":"The start time for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"end_time":{"type":["string","null"],"description":"The end time for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"template_id":{"type":["string","null"],"description":"The template id for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"playlist_id":{"type":["string","null"],"description":"The playlist id for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"type":{"enum":["Playlist","Template","Campaign"],"type":"string"},"devices":{"type":["array","null"],"items":{"type":"object","properties":{"id":{"type":"string","description":"The device id","nullable":true}},"additionalProperties":false},"description":"The devices associated with the schedule."},"conditions":{"type":["array","null"],"items":{"type":"object","properties":{"type":{"enum":["AfterDate","AfterTime","Always","BeforeDate","BeforeTime","Command","DateRange","DayOfMonth","DaysOfWeek","DeviceByGroup","DeviceByNestedGroup","DeviceByName","DeviceByTag","DeviceByOrg","Everywhere","GeoLocation","GpsWithinRadius","KeyEvent","MonthOfYear","Motion","Never","Nowhere","PctAdult","PctChild","PctFemale","PctMale","PctSenior","PctYoung","PctYoungAdult","PlaylistByName","PlaylistByTag","SendCommand","SpecificDevice","SpecificPlaylist","SpecificTemplate","SpecificZone","TemplateByName","TemplateByTag","TimeRange","TopicSet","TotalViewersGreaterThan","TotalViewersLessThan","TouchEvent","WeekOfMonth","WeekOfYear"],"type":"string"},"operator":{"enum":["And","Or","AndNot","OrNot"],"type":"string"},"value_1":{"type":"string","description":"Value 1","nullable":true},"value_2":{"type":"string","description":"Value 2","nullable":true},"value_3":{"type":"string","description":"Value 3","nullable":true},"value_4":{"type":"string","description":"Value 4","nullable":true}},"additionalProperties":false},"description":"The conditions associated with the schedule.\r\nOnly applicable for Campaign schedules."},"priority":{"enum":["Normal","High","Highest","Lowest","Low"],"type":"string"}},"additionalProperties":false,"description":"Schedule model"}}},
    method: "post",
    pathTemplate: "/schedules",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getschedulebyid", {
    name: "getschedulebyid",
    description: `Gets a schedule by ID.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Schedule Id"}},"required":["id"]},
    method: "get",
    pathTemplate: "/schedules/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putschedule", {
    name: "putschedule",
    description: `Update schedule.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Schedule Id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The name of the schedule"},"group_id":{"type":["string","null"],"description":"The group id to which the schedule belongs"},"tags":{"type":["string","null"],"description":"The tags associated with the schedule"},"monday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Monday.\r\nOnly applicable for Playlist and Template schedules."},"tuesday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Tuesday.\r\nOnly applicable for Playlist and Template schedules."},"wednesday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Wednesday.\r\nOnly applicable for Playlist and Template schedules."},"thursday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Thursday.\r\nOnly applicable for Playlist and Template schedules."},"friday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Friday.\r\nOnly applicable for Playlist and Template schedules."},"saturday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Saturday.\r\nOnly applicable for Playlist and Template schedules."},"sunday":{"type":["boolean","null"],"description":"Enabled this schedule for playback on Sunday.\r\nOnly applicable for Playlist and Template schedules."},"start_date":{"type":["string","null"],"description":"The start date for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"end_date":{"type":["string","null"],"description":"The end date for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"start_time":{"type":["string","null"],"description":"The start time for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"end_time":{"type":["string","null"],"description":"The end time for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"template_id":{"type":["string","null"],"description":"The template id for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"playlist_id":{"type":["string","null"],"description":"The playlist id for the schedule.\r\nOnly applicable for Playlist and Template schedules."},"type":{"enum":["Playlist","Template","Campaign"],"type":"string"},"devices":{"type":["array","null"],"items":{"type":"object","properties":{"id":{"type":"string","description":"The device id","nullable":true}},"additionalProperties":false},"description":"The devices associated with the schedule."},"conditions":{"type":["array","null"],"items":{"type":"object","properties":{"type":{"enum":["AfterDate","AfterTime","Always","BeforeDate","BeforeTime","Command","DateRange","DayOfMonth","DaysOfWeek","DeviceByGroup","DeviceByNestedGroup","DeviceByName","DeviceByTag","DeviceByOrg","Everywhere","GeoLocation","GpsWithinRadius","KeyEvent","MonthOfYear","Motion","Never","Nowhere","PctAdult","PctChild","PctFemale","PctMale","PctSenior","PctYoung","PctYoungAdult","PlaylistByName","PlaylistByTag","SendCommand","SpecificDevice","SpecificPlaylist","SpecificTemplate","SpecificZone","TemplateByName","TemplateByTag","TimeRange","TopicSet","TotalViewersGreaterThan","TotalViewersLessThan","TouchEvent","WeekOfMonth","WeekOfYear"],"type":"string"},"operator":{"enum":["And","Or","AndNot","OrNot"],"type":"string"},"value_1":{"type":"string","description":"Value 1","nullable":true},"value_2":{"type":"string","description":"Value 2","nullable":true},"value_3":{"type":"string","description":"Value 3","nullable":true},"value_4":{"type":"string","description":"Value 4","nullable":true}},"additionalProperties":false},"description":"The conditions associated with the schedule.\r\nOnly applicable for Campaign schedules."},"priority":{"enum":["Normal","High","Highest","Lowest","Low"],"type":"string"}},"additionalProperties":false,"description":"Schedule model"}},"required":["id"]},
    method: "put",
    pathTemplate: "/schedules/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deleteschedule", {
    name: "deleteschedule",
    description: `Delete a schedule.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Schedule Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/schedules/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["patchschedule", {
    name: "patchschedule",
    description: `Patch a schedule. Patch allows partial updates by targeting specific properties of the schedule.
Uses the JSON Patch syntax (http://jsonpatch.com)`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Schedule Id"},"requestBody":{"type":"string","description":"Patch update"}},"required":["id"]},
    method: "patch",
    pathTemplate: "/schedules/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json-patch+json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getschedulegroups", {
    name: "getschedulegroups",
    description: `Gets schedule groups in the account.`,
    inputSchema: {"type":"object","properties":{"tree":{"type":"boolean","default":false,"description":"Optional hierarchical data format"},"id":{"type":"string","description":"Optional group id"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"}}},
    method: "get",
    pathTemplate: "/schedules/groups",
    executionParameters: [{"name":"tree","in":"query"},{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["postschedulegroup", {
    name: "postschedulegroup",
    description: `Create a new schedule group.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Schedule group"}}},
    method: "post",
    pathTemplate: "/schedules/groups",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["putschedulegroup", {
    name: "putschedulegroup",
    description: `Updates a schedule group.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Schedule group Id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Schedule group"}},"required":["id"]},
    method: "put",
    pathTemplate: "/schedules/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deleteschedulegroup", {
    name: "deleteschedulegroup",
    description: `Group must be empty.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Schedule group Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/schedules/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["gettemplates", {
    name: "gettemplates",
    description: `Gets all templates in an account.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Optional template id to filter by"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"},"group_id":{"type":"array","items":{"type":"string"},"description":"Optional template group Id"},"group_name":{"type":"array","items":{"type":"string"},"description":"Optional group name to filter by"}}},
    method: "get",
    pathTemplate: "/templates",
    executionParameters: [{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"},{"name":"group_id","in":"query"},{"name":"group_name","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["gettemplatebyid", {
    name: "gettemplatebyid",
    description: `Gets a template by ID.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Template Id"}},"required":["id"]},
    method: "get",
    pathTemplate: "/templates/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deletetemplate", {
    name: "deletetemplate",
    description: `Delete a template.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Template Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/templates/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["gettemplategroups", {
    name: "gettemplategroups",
    description: `Gets template groups in the account.`,
    inputSchema: {"type":"object","properties":{"tree":{"type":"boolean","default":false,"description":"Optional hierarchical data format"},"id":{"type":"string","description":"Optional template id to filter by"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"}}},
    method: "get",
    pathTemplate: "/templates/groups",
    executionParameters: [{"name":"tree","in":"query"},{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["posttemplategroup", {
    name: "posttemplategroup",
    description: `Create a new template group.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Template group"}}},
    method: "post",
    pathTemplate: "/templates/groups",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["puttemplategroup", {
    name: "puttemplategroup",
    description: `Updates a template group.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Group id"},"requestBody":{"type":"object","properties":{"name":{"type":["string","null"],"description":"The group name"}},"additionalProperties":false,"description":"Template group"}},"required":["id"]},
    method: "put",
    pathTemplate: "/templates/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["deletetemplategroup", {
    name: "deletetemplategroup",
    description: `Group must be empty.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Template group Id"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/templates/groups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getusers", {
    name: "getusers",
    description: `Gets all users in an account.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Optional User Id to filter by"},"take":{"type":"number","format":"int32","description":"Optional number of items to return"},"page":{"type":"number","format":"int32","description":"Optional number of page to return"}}},
    method: "get",
    pathTemplate: "/users",
    executionParameters: [{"name":"id","in":"query"},{"name":"take","in":"query"},{"name":"page","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
  ["getuserbyid", {
    name: "getuserbyid",
    description: `Gets a user by ID.`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","description":"Template Id"}},"required":["id"]},
    method: "get",
    pathTemplate: "/users/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"Bearer":["webapi"]},{"ApiKeyInHeader":[]},{"ApiKeyInQuery":[]}]
  }],
]);

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes =   {
    "Bearer": {
      "type": "oauth2",
      "flows": {
        "authorizationCode": {
          "authorizationUrl": "https://id.reveldigital.com/connect/authorize",
          "tokenUrl": "https://id.reveldigital.com/connect/token",
          "scopes": {
            "webapi": "Web API"
          }
        }
      }
    },
    "ApiKeyInHeader": {
      "type": "apiKey",
      "description": "Utilize a header based API key associated with your Revel Digital account. X-RevelDigital-ApiKey: XXXXXXXX",
      "name": "X-RevelDigital-ApiKey",
      "in": "header"
    },
    "ApiKeyInQuery": {
      "type": "apiKey",
      "description": "Utilize a query based API key associated with your Revel Digital account. api_key=XXXXXXXXX",
      "name": "api_key",
      "in": "query"
    }
  };


server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(def => ({
    name: def.name,
    description: def.description,
    inputSchema: def.inputSchema
  }));
  return { tools: toolsForClient };
});


server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  const { name: toolName, arguments: toolArgs } = request.params;
  const toolDefinition = toolDefinitionMap.get(toolName);
  if (!toolDefinition) {
    console.error(`Error: Unknown tool requested: ${toolName}`);
    return { content: [{ type: "text", text: `Error: Unknown tool requested: ${toolName}` }] };
  }
  return await executeApiTool(toolName, toolDefinition, toolArgs ?? {}, securitySchemes);
});



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

/**
 * Acquires an OAuth2 token using client credentials flow
 * 
 * @param schemeName Name of the security scheme
 * @param scheme OAuth2 security scheme
 * @returns Acquired token or null if unable to acquire
 */
async function acquireOAuth2Token(schemeName: string, scheme: any): Promise<string | null | undefined> {
    try {
        // Check if we have the necessary credentials
        const clientId = process.env[`OAUTH_CLIENT_ID_SCHEMENAME`];
        const clientSecret = process.env[`OAUTH_CLIENT_SECRET_SCHEMENAME`];
        const scopes = process.env[`OAUTH_SCOPES_SCHEMENAME`];
        
        if (!clientId || !clientSecret) {
            console.error(`Missing client credentials for OAuth2 scheme '${schemeName}'`);
            return null;
        }
        
        // Initialize token cache if needed
        if (typeof global.__oauthTokenCache === 'undefined') {
            global.__oauthTokenCache = {};
        }
        
        // Check if we have a cached token
        const cacheKey = `${schemeName}_${clientId}`;
        const cachedToken = global.__oauthTokenCache[cacheKey];
        const now = Date.now();
        
        if (cachedToken && cachedToken.expiresAt > now) {
            console.error(`Using cached OAuth2 token for '${schemeName}' (expires in ${Math.floor((cachedToken.expiresAt - now) / 1000)} seconds)`);
            return cachedToken.token;
        }
        
        // Determine token URL based on flow type
        let tokenUrl = '';
        if (scheme.flows?.clientCredentials?.tokenUrl) {
            tokenUrl = scheme.flows.clientCredentials.tokenUrl;
            console.error(`Using client credentials flow for '${schemeName}'`);
        } else if (scheme.flows?.password?.tokenUrl) {
            tokenUrl = scheme.flows.password.tokenUrl;
            console.error(`Using password flow for '${schemeName}'`);
        } else {
            console.error(`No supported OAuth2 flow found for '${schemeName}'`);
            return null;
        }
        
        // Prepare the token request
        let formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        
        // Add scopes if specified
        if (scopes) {
            formData.append('scope', scopes);
        }
        
        console.error(`Requesting OAuth2 token from ${tokenUrl}`);
        
        // Make the token request
        const response = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            data: formData.toString()
        });
        
        // Process the response
        if (response.data?.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || 3600; // Default to 1 hour
            
            // Cache the token
            global.__oauthTokenCache[cacheKey] = {
                token,
                expiresAt: now + (expiresIn * 1000) - 60000 // Expire 1 minute early
            };
            
            console.error(`Successfully acquired OAuth2 token for '${schemeName}' (expires in ${expiresIn} seconds)`);
            return token;
        } else {
            console.error(`Failed to acquire OAuth2 token for '${schemeName}': No access_token in response`);
            return null;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error acquiring OAuth2 token for '${schemeName}':`, errorMessage);
        return null;
    }
}


/**
 * Executes an API tool with the provided arguments
 * 
 * @param toolName Name of the tool to execute
 * @param definition Tool definition
 * @param toolArgs Arguments provided by the user
 * @param allSecuritySchemes Security schemes from the OpenAPI spec
 * @returns Call tool result
 */
async function executeApiTool(
    toolName: string,
    definition: McpToolDefinition,
    toolArgs: JsonObject,
    allSecuritySchemes: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: JsonObject;
    try {
        const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
        const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
        validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
            return { content: [{ type: 'text', text: validationErrorMessage }] };
        } else {
             const errorMessage = error instanceof Error ? error.message : String(error);
             return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
        }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
        const value = validatedArgs[param.name];
        if (typeof value !== 'undefined' && value !== null) {
            if (param.in === 'path') {
                urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
            }
            else if (param.in === 'query') {
                queryParams[param.name] = value;
            }
            else if (param.in === 'header') {
                headers[param.name.toLowerCase()] = String(value);
            }
        }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
        throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }
    
    // Construct the full URL
    const requestUrl = API_BASE_URL ? `${API_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
        requestBodyData = validatedArgs['requestBody'];
        headers['content-type'] = definition.requestBodyContentType;
    }


    // Apply security requirements if available
    // Security requirements use OR between array items and AND within each object
    const appliedSecurity = definition.securityRequirements?.find(req => {
        // Try each security requirement (combined with OR)
        return Object.entries(req).every(([schemeName, scopesArray]) => {
            const scheme = allSecuritySchemes[schemeName];
            if (!scheme) return false;
            
            // API Key security (header, query, cookie)
            if (scheme.type === 'apiKey') {
                return !!process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            // HTTP security (basic, bearer)
            if (scheme.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    return !!process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    return !!process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] && 
                           !!process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
            }
            
            // OAuth2 security
            if (scheme.type === 'oauth2') {
                // Check for pre-existing token
                if (process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    return true;
                }
                
                // Check for client credentials for auto-acquisition
                if (process.env[`OAUTH_CLIENT_ID_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] &&
                    process.env[`OAUTH_CLIENT_SECRET_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    // Verify we have a supported flow
                    if (scheme.flows?.clientCredentials || scheme.flows?.password) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // OpenID Connect
            if (scheme.type === 'openIdConnect') {
                return !!process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            return false;
        });
    });

    // If we found matching security scheme(s), apply them
    if (appliedSecurity) {
        // Apply each security scheme from this requirement (combined with AND)
        for (const [schemeName, scopesArray] of Object.entries(appliedSecurity)) {
            const scheme = allSecuritySchemes[schemeName];
            
            // API Key security
            if (scheme?.type === 'apiKey') {
                const apiKey = process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (apiKey) {
                    if (scheme.in === 'header') {
                        headers[scheme.name.toLowerCase()] = apiKey;
                        console.error(`Applied API key '${schemeName}' in header '${scheme.name}'`);
                    }
                    else if (scheme.in === 'query') {
                        queryParams[scheme.name] = apiKey;
                        console.error(`Applied API key '${schemeName}' in query parameter '${scheme.name}'`);
                    }
                    else if (scheme.in === 'cookie') {
                        // Add the cookie, preserving other cookies if they exist
                        headers['cookie'] = `${scheme.name}=${apiKey}${headers['cookie'] ? `; ${headers['cookie']}` : ''}`;
                        console.error(`Applied API key '${schemeName}' in cookie '${scheme.name}'`);
                    }
                }
            } 
            // HTTP security (Bearer or Basic)
            else if (scheme?.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    const token = process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (token) {
                        headers['authorization'] = `Bearer ${token}`;
                        console.error(`Applied Bearer token for '${schemeName}'`);
                    }
                } 
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    const username = process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    const password = process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (username && password) {
                        headers['authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
                        console.error(`Applied Basic authentication for '${schemeName}'`);
                    }
                }
            }
            // OAuth2 security
            else if (scheme?.type === 'oauth2') {
                // First try to use a pre-provided token
                let token = process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                
                // If no token but we have client credentials, try to acquire a token
                if (!token && (scheme.flows?.clientCredentials || scheme.flows?.password)) {
                    console.error(`Attempting to acquire OAuth token for '${schemeName}'`);
                    token = (await acquireOAuth2Token(schemeName, scheme)) ?? '';
                }
                
                // Apply token if available
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OAuth2 token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
            // OpenID Connect
            else if (scheme?.type === 'openIdConnect') {
                const token = process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OpenID Connect token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
        }
    } 
    // Log warning if security is required but not available
    else if (definition.securityRequirements?.length > 0) {
        // First generate a more readable representation of the security requirements
        const securityRequirementsString = definition.securityRequirements
            .map(req => {
                const parts = Object.entries(req)
                    .map(([name, scopesArray]) => {
                        const scopes = scopesArray as string[];
                        if (scopes.length === 0) return name;
                        return `${name} (scopes: ${scopes.join(', ')})`;
                    })
                    .join(' AND ');
                return `[${parts}]`;
            })
            .join(' OR ');
            
        console.warn(`Tool '${toolName}' requires security: ${securityRequirementsString}, but no suitable credentials found.`);
    }
    

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(), 
      url: requestUrl, 
      params: queryParams, 
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);
    
    // Execute the request
    const response = await axios(config);

    // Process and format the response
    let responseText = '';
    const contentType = response.headers['content-type']?.toLowerCase() || '';
    
    // Handle JSON responses
    if (contentType.includes('application/json') && typeof response.data === 'object' && response.data !== null) {
         try { 
             responseText = JSON.stringify(response.data, null, 2); 
         } catch (e) { 
             responseText = "[Stringify Error]"; 
         }
    } 
    // Handle string responses
    else if (typeof response.data === 'string') { 
         responseText = response.data; 
    }
    // Handle other response types
    else if (response.data !== undefined && response.data !== null) { 
         responseText = String(response.data); 
    }
    // Handle empty responses
    else { 
         responseText = `(Status: ${response.status} - No body content)`; 
    }
    
    // Return formatted response
    return { 
        content: [ 
            { 
                type: "text", 
                text: `API Response (Status: ${response.status}):\n${responseText}` 
            } 
        ], 
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;
    
    // Format Axios errors specially
    if (axios.isAxiosError(error)) { 
        errorMessage = formatApiError(error); 
    }
    // Handle standard errors
    else if (error instanceof Error) { 
        errorMessage = error.message; 
    }
    // Handle unexpected error types
    else { 
        errorMessage = 'Unexpected error: ' + String(error); 
    }
    
    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    
    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
}


/**
 * Main function to start the server
 */
async function main() {
// Set up stdio transport
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${SERVER_NAME} MCP Server (v${SERVER_VERSION}) running on stdio${API_BASE_URL ? `, proxying API at ${API_BASE_URL}` : ''}`);
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
    console.error("Shutting down MCP server...");
    process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 * 
 * @param error Axios error
 * @returns Formatted error message
 */
function formatApiError(error: AxiosError): string {
    let message = 'API request failed.';
    if (error.response) {
        message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
        const responseData = error.response.data;
        const MAX_LEN = 200;
        if (typeof responseData === 'string') { 
            message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`; 
        }
        else if (responseData) { 
            try { 
                const jsonString = JSON.stringify(responseData); 
                message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`; 
            } catch { 
                message += 'Response: [Could not serialize data]'; 
            } 
        }
        else { 
            message += 'No response body received.'; 
        }
    } else if (error.request) {
        message = 'API Network Error: No response received from server.';
        if (error.code) message += ` (Code: ${error.code})`;
    } else { 
        message += `API Request Setup Error: ${error.message}`; 
    }
    return message;
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 * 
 * @param jsonSchema JSON Schema
 * @param toolName Tool name for error reporting
 * @returns Zod schema
 */
function getZodSchemaFromJsonSchema(jsonSchema: any, toolName: string): z.ZodTypeAny {
    if (typeof jsonSchema !== 'object' || jsonSchema === null) { 
        return z.object({}).passthrough(); 
    }
    try {
        const zodSchemaString = jsonSchemaToZod(jsonSchema);
        const zodSchema = eval(zodSchemaString);
        if (typeof zodSchema?.parse !== 'function') { 
            throw new Error('Eval did not produce a valid Zod schema.'); 
        }
        return zodSchema as z.ZodTypeAny;
    } catch (err: any) {
        console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, err);
        return z.object({}).passthrough();
    }
}
