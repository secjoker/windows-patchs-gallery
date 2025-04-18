export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-8">About Microsoft Update PatchGallery</h1>
        
        <div className="prose lg:prose-xl">
          <p>
            Microsoft Update PatchGallery is a platform designed to help users track and monitor
            Windows security updates and patches. It provides a user-friendly interface to browse
            and filter security vulnerabilities addressed by Microsoft.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Features</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Browse Windows security updates by date range</li>
            <li>Filter vulnerabilities by severity (Critical, Important, Low)</li>
            <li>Identify exploited vulnerabilities</li>
            <li>View detailed information about each vulnerability</li>
            <li>Direct links to Microsoft Security Response Center for more information</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Data Source</h2>
          <p>
            The data displayed in this application is sourced from the Microsoft Security Response Center (MSRC) API.
            The API provides comprehensive information about security vulnerabilities, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>CVE identifiers and titles</li>
            <li>Release dates</li>
            <li>Severity ratings</li>
            <li>Exploitation status</li>
            <li>Detailed descriptions</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Technology Stack</h2>
          <p>
            This application is built using modern web technologies:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Next.js - React framework for server-side rendering and static site generation</li>
            <li>Tailwind CSS - Utility-first CSS framework</li>
            <li>shadcn/ui - Reusable UI components built with Radix UI and Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
