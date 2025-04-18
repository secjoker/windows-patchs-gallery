"use client"

import { format } from "date-fns";

export interface Vulnerability {
  id: string;
  releaseDate: string;
  cveNumber: string;
  cveTitle: string;
  releaseNumber: string;
  vulnType: string;
  description: string;
  unformattedDescription: string;
  mitreText: string;
  mitreUrl: string;
  tag: string;
  issuingCna: string;
  severity: string;
  impact: string;
  publiclyDisclosed: string;
  exploited: string;
  baseScore: string;
  vectorString: string;
  cweList: string[];
  articles: {
    articleType: string;
    description: string;
    ordinal: number;
  }[];
  revisions: {
    cveNumber: string;
    version: number;
    revisionDate: string;
    description: string;
    unformattedDescription: string;
  }[];
}

export interface ApiResponse {
  "@odata.context": string;
  "@odata.count": number;
  value: Vulnerability[];
}

export async function fetchVulnerabilities(
  fromDate: Date,
  toDate: Date
): Promise<Vulnerability[]> {
  try {
    // Format dates for the API
    const fromDateStr = format(fromDate, "yyyy-MM-dd'T'00:00:00'+08:00'");
    const toDateStr = format(toDate, "yyyy-MM-dd'T'23:59:59'+08:00'");
    
    // Construct the URL with the date filters
    const url = `https://api.msrc.microsoft.com/sug/v2.0/en-US/vulnerability?%24orderBy=releaseDate+desc&%24filter=%28releaseDate+gt+${encodeURIComponent(
      fromDateStr
    )}%29+and+%28releaseDate+lt+${encodeURIComponent(toDateStr)}%29`;
    
    // Fetch the data
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.value;
  } catch (error) {
    console.error("Error fetching vulnerabilities:", error);
    return [];
  }
}
