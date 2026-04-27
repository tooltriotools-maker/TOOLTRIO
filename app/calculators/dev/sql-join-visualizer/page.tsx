import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'SQL JOIN Visualizer — Visual JOIN Type Explainer Free',
  description: 'Visualize SQL JOIN types with Venn diagrams and example queries. INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF joins explained. Runs in your browser.',
  slug: 'sql-join-visualizer',
  keywords: ['sql join visualizer online free','sql joins diagram browser','inner join left join right join visual','sql join types explained diagram','sql join venn diagram online','visualize sql joins free','sql table join preview browser'],
})

const faqs = [
  { question: "What is the difference between INNER JOIN and LEFT JOIN?", answer: `INNER JOIN returns only rows where the join condition is met in BOTH tables — rows with no match in either table are excluded. LEFT JOIN (LEFT OUTER JOIN) returns ALL rows from the left table, plus matching rows from the right table. Where there is no match, right-side columns are NULL. Use INNER JOIN when you only want records with matches on both sides. Use LEFT JOIN when you want all records from the primary table regardless of whether they have related records in the secondary table — for example: all users, with their orders if they have any.` },
  { question: "What is a FULL OUTER JOIN and when do I use it?", answer: `FULL OUTER JOIN returns all rows from both tables, with NULLs where there is no match on either side. It is the combination of LEFT JOIN and RIGHT JOIN. Use case: comparing two datasets to find records that exist in one but not both — for example, reconciling two customer lists from different systems. Note: MySQL does not natively support FULL OUTER JOIN — simulate it with LEFT JOIN UNION ALL RIGHT JOIN WHERE left_table.id IS NULL. PostgreSQL, SQL Server, and Oracle support it natively.` },
  { question: "What is a CROSS JOIN and when is it actually useful?", answer: `CROSS JOIN produces the Cartesian product — every row from table A combined with every row from table B. If A has 100 rows and B has 50, the result has 5,000 rows. This sounds impractical but has real uses: generating all combinations of options (sizes × colors for a product catalog), creating a calendar table by crossing dates × time slots, test data generation (every customer × every product), and mathematical permutation problems. Always add a WHERE clause or it will accidentally return massive result sets. Implicit cross joins happen when FROM A, B is used without a JOIN condition.` },
  { question: "What is a self JOIN and give a real example?", answer: `A self JOIN joins a table to itself using aliases. Classic example: an employee table where each row has a manager_id that references another employee's id. SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id. This retrieves each employee alongside their manager's name from the same table. Other real uses: finding duplicate rows (join table to itself on matching columns), organizational hierarchy traversal, and finding products frequently purchased together (join orders to itself on order_id).` },
  { question: "What is the difference between WHERE and HAVING in a JOIN query?", answer: `WHERE filters rows BEFORE aggregation — it applies to individual rows. HAVING filters groups AFTER aggregation — it applies to GROUP BY results. In a JOIN: WHERE filters which rows participate in the aggregation. HAVING filters which aggregated groups appear in the output. Example: SELECT customer_id, SUM(amount) FROM orders JOIN products ON orders.product_id = products.id WHERE products.category = 'electronics' GROUP BY customer_id HAVING SUM(amount) > 1000. WHERE filters to electronics orders before summing; HAVING filters to customers who spent over $1000 on electronics.` },
  { question: "How do NULL values behave in JOIN conditions?", answer: `NULL is never equal to anything — including NULL. NULL = NULL evaluates to NULL (not TRUE). This means rows with NULL values in the join column never match, even if both sides have NULL. In INNER JOIN, NULL rows are excluded from results. In LEFT JOIN, the left row appears with NULL right-side columns if the left key is NULL or has no match. To explicitly match on NULL: use IS NOT DISTINCT FROM (PostgreSQL/SQL Server) or IFNULL/COALESCE to replace NULL with a sentinel value before joining. This NULL behavior is a common source of unexpected missing rows in JOIN results.` },
  { question: "What other database tools are on this site?", answer: `The SQL Formatter beautifies and indents SQL queries including JOIN syntax. The Diff Checker compares two versions of a query before modifying production data. The JSON Formatter reads JSON payloads from ORM queries. The CSV to JSON and JSON to CSV tools handle data export from JOIN query results. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'SQL JOIN Visualizer — Visual JOIN Type Explainer Free',
    description: 'Visualize SQL JOIN types with Venn diagrams and example queries. INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF joins explained. Runs in your browser.',
    slug: 'sql-join-visualizer',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
