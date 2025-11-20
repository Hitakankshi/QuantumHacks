import type { Report } from './types';

export const reports: Report[] = [
  {
    id: 'report-1',
    url: 'https.example-ecommerce.com',
    scanDate: '2024-07-29',
    score: 78,
    issues: [
      {
        id: 'perf-1',
        category: 'Performance',
        severity: 'High',
        title: 'Reduce initial server response time',
        description:
          'Time To First Byte (TTFB) is 850ms, which is longer than the recommended 600ms. This can be caused by slow server logic, database queries, or network latency.',
        possibleSolutions: [
          'Optimize application code and database queries.',
          'Upgrade server hardware or hosting plan.',
          'Implement a Content Delivery Network (CDN) to cache content closer to users.',
          'Enable server-side caching for dynamic content.',
        ],
      },
      {
        id: 'seo-1',
        category: 'SEO',
        severity: 'Medium',
        title: 'Missing meta descriptions',
        description:
          '15 pages on your site are missing meta descriptions, which can negatively impact click-through rates from search engine results.',
        possibleSolutions: [
          'Manually write unique and compelling meta descriptions for each of the 15 pages.',
          'Use a plugin or script to auto-generate meta descriptions based on page content.',
          'Prioritize writing descriptions for the most important pages first.',
        ],
      },
      {
        id: 'access-1',
        category: 'Accessibility',
        severity: 'Critical',
        title: 'Images missing alt text',
        description:
          '32 images across your site lack alternative text, making them inaccessible to users with screen readers.',
        possibleSolutions: [
          'Go through each of the 32 images and add descriptive alt text that conveys the meaning of the image.',
          'Use an AI-powered tool to generate alt text for the images.',
          'Mark decorative images with an empty alt attribute (alt="").',
        ],
      },
    ],
  },
  {
    id: 'report-2',
    url: 'https://my-blog-site.dev',
    scanDate: '2024-07-28',
    score: 92,
    issues: [
      {
        id: 'perf-2',
        category: 'Performance',
        severity: 'Low',
        title: 'Leverage browser caching',
        description:
          'Some static assets have short cache lifetimes. Increasing the cache lifetime can improve load times for repeat visitors.',
        possibleSolutions: [
          'Configure your server (e.g., Apache, Nginx) to set longer cache-control headers for static file types like images, CSS, and JavaScript.',
          'Use a CDN that automatically manages caching policies.',
        ],
      },
      {
        id: 'sec-1',
        category: 'Security',
        severity: 'Medium',
        title: 'Missing Content Security Policy (CSP) header',
        description:
          'Your site does not have a Content Security Policy, which makes it more vulnerable to cross-site scripting (XSS) attacks.',
        possibleSolutions: [
          'Implement a strict CSP header that specifies which sources of content are trusted.',
          'Start with a report-only CSP to identify potential issues before enforcement.',
          'Use a tool to generate a suitable CSP for your site.',
        ],
      },
    ],
  },
  {
    id: 'report-3',
    url: 'https://saas-startup.io',
    scanDate: '2024-07-27',
    score: 64,
    issues: [
       {
        id: 'perf-3',
        category: 'Performance',
        severity: 'Critical',
        title: 'Render-blocking resources',
        description:
          'Your page has 3 render-blocking CSS and 2 render-blocking JavaScript files in the head, delaying the time to first paint.',
        possibleSolutions: [
          'Inline critical CSS and defer non-critical CSS.',
          'Move script tags to the end of the body tag and use the `async` or `defer` attributes.',
          'Use a build tool to bundle and minify CSS and JavaScript files.',
        ],
      },
      {
        id: 'seo-2',
        category: 'SEO',
        severity: 'High',
        title: 'Broken internal links',
        description: 'Found 8 broken internal links, which leads to a poor user experience and wastes crawl budget.',
        possibleSolutions: [
          'Use a broken link checker tool to identify and update all broken links.',
          'Set up 301 redirects for links that have permanently moved.',
          'Regularly audit your site for new broken links.',
        ],
      },
       {
        id: 'access-2',
        category: 'Accessibility',
        severity: 'Medium',
        title: 'Low contrast text',
        description:
          'Several text elements have insufficient color contrast, making them difficult to read for visually impaired users.',
        possibleSolutions: [
          'Adjust the text and background colors to meet WCAG AA contrast ratio guidelines (at least 4.5:1 for normal text).',
          'Use an online contrast checker to verify your color combinations.',
        ],
      },
    ],
  },
];

export function getReports() {
  return reports;
}

export function getReportById(id: string) {
  return reports.find((report) => report.id === id);
}
