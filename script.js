 // Exchange rates (extended with more currencies)
        const exchangeRates = {
            USD: { 
                USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110.53, INR: 82.68,
                AUD: 1.34, CAD: 1.25, CHF: 0.92, CNY: 6.47, NZD: 1.43,
                SGD: 1.35, KRW: 1185.50, BRL: 5.25, RUB: 73.50, MXN: 20.05,
                TRY: 8.65, ZAR: 14.72, SEK: 8.58, NOK: 8.73, AED: 3.67
            },
            EUR: { 
                USD: 1.18, EUR: 1, GBP: 0.86, JPY: 130.21, INR: 97.42,
                AUD: 1.58, CAD: 1.47, CHF: 1.08, CNY: 7.62, NZD: 1.68,
                SGD: 1.59, KRW: 1395.00, BRL: 6.18, RUB: 86.50, MXN: 23.60,
                TRY: 10.18, ZAR: 17.32, SEK: 10.10, NOK: 10.27, AED: 4.32
            },
            GBP: { 
                USD: 1.37, EUR: 1.16, GBP: 1, JPY: 151.52, INR: 113.36,
                AUD: 1.84, CAD: 1.71, CHF: 1.26, CNY: 8.87, NZD: 1.96,
                SGD: 1.85, KRW: 1625.00, BRL: 7.20, RUB: 100.80, MXN: 27.50,
                TRY: 11.85, ZAR: 20.18, SEK: 11.76, NOK: 11.96, AED: 5.03
            },
            JPY: { 
                USD: 0.0090, EUR: 0.0077, GBP: 0.0066, JPY: 1, INR: 0.75,
                AUD: 0.0121, CAD: 0.0113, CHF: 0.0083, CNY: 0.058, NZD: 0.0129,
                SGD: 0.0122, KRW: 10.72, BRL: 0.0475, RUB: 0.665, MXN: 0.181,
                TRY: 0.078, ZAR: 0.132, SEK: 0.077, NOK: 0.078, AED: 0.033
            },
            INR: { 
                USD: 0.012, EUR: 0.010, GBP: 0.0088, JPY: 1.33, INR: 1,
                AUD: 0.0162, CAD: 0.0151, CHF: 0.0111, CNY: 0.078, NZD: 0.0173,
                SGD: 0.0163, KRW: 14.33, BRL: 0.0635, RUB: 0.888, MXN: 0.242,
                TRY: 0.104, ZAR: 0.177, SEK: 0.103, NOK: 0.105, AED: 0.044
            },
            AUD: { 
                USD: 0.75, EUR: 0.63, GBP: 0.54, JPY: 82.64, INR: 61.73,
                AUD: 1, CAD: 0.93, CHF: 0.69, CNY: 4.83, NZD: 1.07,
                SGD: 1.01, KRW: 884.70, BRL: 3.92, RUB: 54.85, MXN: 14.96,
                TRY: 6.45, ZAR: 10.98, SEK: 6.40, NOK: 6.51, AED: 2.74
            },
            CAD: { 
                USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.42, INR: 66.23,
                AUD: 1.08, CAD: 1, CHF: 0.74, CNY: 5.18, NZD: 1.14,
                SGD: 1.08, KRW: 948.40, BRL: 4.20, RUB: 58.80, MXN: 16.04,
                TRY: 6.92, ZAR: 11.78, SEK: 6.86, NOK: 6.98, AED: 2.94
            },
            CHF: { 
                USD: 1.09, EUR: 0.93, GBP: 0.79, JPY: 120.11, INR: 90.09,
                AUD: 1.45, CAD: 1.35, CHF: 1, CNY: 7.03, NZD: 1.55,
                SGD: 1.47, KRW: 1288.59, BRL: 5.71, RUB: 79.89, MXN: 21.79,
                TRY: 9.40, ZAR: 16.00, SEK: 9.32, NOK: 9.48, AED: 3.99
            },
            CNY: { 
                USD: 0.15, EUR: 0.13, GBP: 0.11, JPY: 17.08, INR: 12.82,
                AUD: 0.21, CAD: 0.19, CHF: 0.14, CNY: 1, NZD: 0.22,
                SGD: 0.21, KRW: 183.23, BRL: 0.81, RUB: 11.35, MXN: 3.10,
                TRY: 1.34, ZAR: 2.28, SEK: 1.33, NOK: 1.35, AED: 0.57
            },
            NZD: { 
                USD: 0.70, EUR: 0.60, GBP: 0.51, JPY: 77.52, INR: 57.80,
                AUD: 0.93, CAD: 0.88, CHF: 0.65, CNY: 4.55, NZD: 1,
                SGD: 0.94, KRW: 829.02, BRL: 3.67, RUB: 51.40, MXN: 14.02,
                TRY: 6.05, ZAR: 10.30, SEK: 6.00, NOK: 6.10, AED: 2.57
            },
            SGD: { 
                USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 82.22, INR: 61.35,
                AUD: 0.99, CAD: 0.93, CHF: 0.68, CNY: 4.81, NZD: 1.06,
                SGD: 1, KRW: 878.15, BRL: 3.89, RUB: 54.44, MXN: 14.85,
                TRY: 6.41, ZAR: 10.91, SEK: 6.36, NOK: 6.47, AED: 2.72
            },
            KRW: { 
                USD: 0.00084, EUR: 0.00072, GBP: 0.00062, JPY: 0.093, INR: 0.070,
                AUD: 0.00113, CAD: 0.00105, CHF: 0.00078, CNY: 0.0055, NZD: 0.00121,
                SGD: 0.00114, KRW: 1, BRL: 0.0044, RUB: 0.062, MXN: 0.0169,
                TRY: 0.0073, ZAR: 0.0124, SEK: 0.0072, NOK: 0.0073, AED: 0.0031
            },
            BRL: { 
                USD: 0.19, EUR: 0.16, GBP: 0.14, JPY: 21.05, INR: 15.75,
                AUD: 0.26, CAD: 0.24, CHF: 0.18, CNY: 1.23, NZD: 0.27,
                SGD: 0.26, KRW: 227.62, BRL: 1, RUB: 14.00, MXN: 3.82,
                TRY: 1.65, ZAR: 2.80, SEK: 1.63, NOK: 1.66, AED: 0.70
            },
            RUB: { 
                USD: 0.014, EUR: 0.012, GBP: 0.0099, JPY: 1.50, INR: 1.13,
                AUD: 0.0182, CAD: 0.0170, CHF: 0.0125, CNY: 0.088, NZD: 0.0195,
                SGD: 0.0184, KRW: 16.13, BRL: 0.0714, RUB: 1, MXN: 0.273,
                TRY: 0.118, ZAR: 0.200, SEK: 0.117, NOK: 0.119, AED: 0.050
            },
            MXN: { 
                USD: 0.050, EUR: 0.042, GBP: 0.036, JPY: 5.52, INR: 4.13,
                AUD: 0.067, CAD: 0.062, CHF: 0.046, CNY: 0.322, NZD: 0.071,
                SGD: 0.067, KRW: 59.10, BRL: 0.262, RUB: 3.66, MXN: 1,
                TRY: 0.431, ZAR: 0.734, SEK: 0.428, NOK: 0.435, AED: 0.183
            },
            TRY: { 
                USD: 0.116, EUR: 0.098, GBP: 0.084, JPY: 12.82, INR: 9.62,
                AUD: 0.155, CAD: 0.144, CHF: 0.106, CNY: 0.75, NZD: 0.165,
                SGD: 0.156, KRW: 137.00, BRL: 0.606, RUB: 8.47, MXN: 2.32,
                TRY: 1, ZAR: 1.70, SEK: 0.99, NOK: 1.01, AED: 0.425
            },
            ZAR: { 
                USD: 0.068, EUR: 0.058, GBP: 0.050, JPY: 7.58, INR: 5.65,
                AUD: 0.091, CAD: 0.085, CHF: 0.063, CNY: 0.44, NZD: 0.097,
                SGD: 0.092, KRW: 80.65, BRL: 0.357, RUB: 5.00, MXN: 1.36,
                TRY: 0.588, ZAR: 1, SEK: 0.583, NOK: 0.593, AED: 0.250
            },
            SEK: { 
                USD: 0.117, EUR: 0.099, GBP: 0.085, JPY: 12.99, INR: 9.71,
                AUD: 0.156, CAD: 0.146, CHF: 0.107, CNY: 0.75, NZD: 0.167,
                SGD: 0.157, KRW: 138.89, BRL: 0.614, RUB: 8.55, MXN: 2.34,
                TRY: 1.01, ZAR: 1.72, SEK: 1, NOK: 1.02, AED: 0.428
            },
            NOK: { 
                USD: 0.115, EUR: 0.097, GBP: 0.084, JPY: 12.82, INR: 9.52,
                AUD: 0.154, CAD: 0.143, CHF: 0.105, CNY: 0.74, NZD: 0.164,
                SGD: 0.155, KRW: 136.99, BRL: 0.602, RUB: 8.40, MXN: 2.30,
                TRY: 0.99, ZAR: 1.69, SEK: 0.98, NOK: 1, AED: 0.421
            },
            AED: { 
                USD: 0.272, EUR: 0.231, GBP: 0.199, JPY: 30.25, INR: 22.73,
                AUD: 0.365, CAD: 0.340, CHF: 0.251, CNY: 1.76, NZD: 0.389,
                SGD: 0.367, KRW: 322.62, BRL: 1.43, RUB: 20.00, MXN: 5.46,
                TRY: 2.35, ZAR: 4.00, SEK: 2.34, NOK: 2.38, AED: 1
            }
        };

        // Country code to currency mapping
        const countryFlags = {
            USD: "us",
            EUR: "eu",
            GBP: "gb",
            JPY: "jp",
            INR: "in",
            AUD: "au",
            CAD: "ca",
            CHF: "ch",
            CNY: "cn",
            NZD: "nz",
            SGD: "sg",
            KRW: "kr",
            BRL: "br",
            RUB: "ru",
            MXN: "mx",
            TRY: "tr",
            ZAR: "za",
            SEK: "se",
            NOK: "no",
            AED: "ae"
        };

        // Get DOM elements
        const amountInput = document.getElementById('amount');
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');
        const resultElement = document.getElementById('result');
        const convertBtn = document.getElementById('convert-btn');
        const swapBtn = document.getElementById('swap-btn');
        const exchangeRateElement = document.getElementById('exchange-rate');

        // Function to update flag icons
        function updateFlagIcons() {
            const fromValue = fromCurrency.value;
            const toValue = toCurrency.value;
            
            // Set background images for select elements
            fromCurrency.style.backgroundImage = `url('https://flagcdn.com/w40/${countryFlags[fromValue]}.png')`;
            toCurrency.style.backgroundImage = `url('https://flagcdn.com/w40/${countryFlags[toValue]}.png')`;
        }

        // Format currency function
        function formatCurrency(amount, currency) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        }

        // Update exchange rate text
        function updateExchangeRateText() {
            const from = fromCurrency.value;
            const to = toCurrency.value;
            const rate = exchangeRates[from][to];
            exchangeRateElement.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        }

        // Convert currency function
        function convertCurrency() {
            const amount = parseFloat(amountInput.value);
            const from = fromCurrency.value;
            const to = toCurrency.value;
            
            if (isNaN(amount) || amount < 0) {
                resultElement.textContent = 'Please enter a valid amount';
                return;
            }
            
            const rate = exchangeRates[from][to];
            const result = amount * rate;
            
            resultElement.textContent = formatCurrency(result, to);
            updateExchangeRateText();
            updateFlagIcons();
        }

        // Swap currencies function
        function swapCurrencies() {
            const temp = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = temp;
            convertCurrency();
        }

        // Event listeners
        convertBtn.addEventListener('click', convertCurrency);
        swapBtn.addEventListener('click', swapCurrencies);
        amountInput.addEventListener('input', convertCurrency);
        fromCurrency.addEventListener('change', convertCurrency);
        toCurrency.addEventListener('change', convertCurrency);

        // Initialize converter
        updateFlagIcons();
        convertCurrency();