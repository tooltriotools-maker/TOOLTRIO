# ToolTrio Content Architecture

## Rule

A calculator guide must be primarily about the calculation. Product-wide copy such as free/no-signup, browser privacy, device compatibility, and generic trust language belongs in shared UI components rather than being repeated inside every guide.

## Health content

Health guides must describe the specific formula or estimation method, inputs, interpretation, limitations, and sources that actually apply to that calculator. Do not claim CDC/NIH/AHA validation unless the specific method is documented to be supported by that organization.

`components/ui/SEOContent.tsx` filters known generic health benefit/use-case blocks from the topical guide while preserving the underlying calculator UI.

## Review dates

Never generate a review date from the current build date. A review date is content metadata and must be supplied explicitly after a real review.
