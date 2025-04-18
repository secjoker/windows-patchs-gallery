"use client"

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchVulnerabilities, Vulnerability } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 4, 1), // May 1, 2024
    to: new Date() // Today
  });
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-6xl w-full items-center justify-between">
        <h1 className="text-4xl font-bold text-center mb-8">Microsoft Update PatchGallery</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Updates</CardTitle>
            <CardDescription>Select a date range to filter Windows updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <DatePickerWithRange
                className="flex-1"
                onChange={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
              />
              <Button onClick={fetchData} disabled={loading}>
                {loading ? "Loading..." : "Search Updates"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={severityFilter === "Critical" ? "default" : "outline"}
                size="sm"
                onClick={() => setSeverityFilter(severityFilter === "Critical" ? null : "Critical")}
              >
                Critical
              </Button>
              <Button
                variant={severityFilter === "Important" ? "default" : "outline"}
                size="sm"
                onClick={() => setSeverityFilter(severityFilter === "Important" ? null : "Important")}
              >
                Important
              </Button>
              <Button
                variant={severityFilter === "Low" ? "default" : "outline"}
                size="sm"
                onClick={() => setSeverityFilter(severityFilter === "Low" ? null : "Low")}
              >
                Low
              </Button>
              <Button
                variant={exploitedFilter === true ? "default" : "outline"}
                size="sm"
                onClick={() => setExploitedFilter(exploitedFilter === true ? null : true)}
              >
                Exploited
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2">Loading vulnerabilities...</p>
          </div>
        ) : filteredVulnerabilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVulnerabilities.map((vulnerability) => (
              <VulnerabilityCard key={vulnerability.id} vulnerability={vulnerability} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No vulnerabilities found for the selected filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
