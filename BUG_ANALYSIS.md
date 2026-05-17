# Bug Analysis

## Critical/High Impact Bugs

1. **“Updated daily” claim is incorrect and misleading.**
   - UI says rates are updated daily, but all rates are hard-coded in `script.js`.
   - No API calls, no fetch logic, no timestamp, and no update scheduler exist.

2. **Exchange-rate matrix is internally inconsistent.**
   - Many reciprocal rates do not match mathematically (e.g. `USD -> EUR` and `EUR -> USD` are not exact inverses).
   - This produces different results depending on route and can erode trust.

3. **Potential runtime crash for unsupported currencies.**
   - Conversion and rate-text logic assumes `exchangeRates[from][to]` always exists.
   - If future options are added in HTML but map entries are forgotten, `.toFixed()` or multiplication will throw/produce `NaN`.

## Medium Bugs

4. **Invalid amount handling leaves stale exchange-rate text.**
   - On invalid input, only result text is updated.
   - Exchange-rate chip can display outdated rate from previous valid conversion.

5. **Initial placeholder/result mismatch before JS runs.**
   - HTML default result is `$1.21`, but default amount/currencies are `100 INR -> USD`.
   - On slow script load, users see an incorrect value briefly.

6. **Country flag mapping is conceptually wrong for EUR.**
   - Uses `eu` as if it were a country; “country flags” wording is inaccurate for some currencies (EUR, potentially others).

## Low/UX Bugs

7. **Convert button is mostly redundant and may confuse behavior.**
   - Auto-convert already occurs on every input/select change.
   - “Convert Now” implies pending state that does not exist.

8. **No explicit empty-input UX for number field.**
   - Clearing input shows error text in result panel, but no inline validation/aria feedback on the input itself.

9. **External flag CDN dependency without fallback.**
   - If `flagcdn.com` fails, dropdown icon area is blank and there is no fallback icon/style.

## Suggested Fix Direction (short)

- Replace hard-coded matrix with live exchange-rate API + timestamp.
- Validate presence of `exchangeRates[from]` and `exchangeRates[from][to]` before use.
- Normalize rates from one base currency to avoid reciprocal drift.
- Update UI copy from “updated daily” to factual dynamic status.
- Add resilient fallback for missing flag images.
