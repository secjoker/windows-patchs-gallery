"use client"

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchVulnerabilities, Vulnerability } from "@/lib/api";
import { useEffect, useState } from "react";
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { SearchFilters } from '@/components/search-filters'
import { Statistics } from '@/components/statistics'
import { DataVisualization } from '@/components/data-visualization'
import { PatchList } from '@/components/patch-list'
import { Footer } from '@/components/footer'

export default function Home() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 4, 1), // May 1, 2024
    to: new Date() // Today
  });
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRangeError, setDateRangeError] = useState<string | undefined>(undefined);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [exploitedFilter, setExploitedFilter] = useState<boolean | null>(null);

  // Function to fetch vulnerabilities
  const fetchData = async () => {
    if (!dateRange.from || !dateRange.to) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchVulnerabilities(dateRange.from, dateRange.to);
      setVulnerabilities(data);
    } catch (err) {
      setError("Failed to fetch vulnerability data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Filter vulnerabilities based on selected filters
  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    if (severityFilter && vuln.severity !== severityFilter) return false;
    if (exploitedFilter !== null && (vuln.exploited === "Yes") !== exploitedFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
          <SearchFilters />
          <Statistics />
          <DataVisualization />
          <PatchList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
