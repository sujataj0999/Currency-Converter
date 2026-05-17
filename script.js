// Live exchange-rate configuration
const BASE_CURRENCY = 'USD';
const LIVE_RATES_API = 'https://api.frankfurter.app/latest?from=USD';

// Fallback rates (used only if live fetch fails)
const fallbackUsdBaseRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.53,
    INR: 95.97,
    AUD: 1.34,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.47,
    NZD: 1.43,
    SGD: 1.35,
    KRW: 1185.5,
    BRL: 5.25,
    RUB: 73.5,
    MXN: 20.05,
    TRY: 8.65,
    ZAR: 14.72,
    SEK: 8.58,
    NOK: 8.73,
    AED: 3.67
};

let usdBaseRates = { ...fallbackUsdBaseRates };
let lastUpdatedLabel = 'Rates ready';

const currencyIcons = {
    USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', INR: 'in', AUD: 'au', CAD: 'ca',
    CHF: 'ch', CNY: 'cn', NZD: 'nz', SGD: 'sg', KRW: 'kr', BRL: 'br', RUB: 'ru',
    MXN: 'mx', TRY: 'tr', ZAR: 'za', SEK: 'se', NOK: 'no', AED: 'ae'
};

const currencyNames = {
    USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen', INR: 'Indian Rupee',
    AUD: 'Australian Dollar', CAD: 'Canadian Dollar', CHF: 'Swiss Franc', CNY: 'Chinese Yuan',
    NZD: 'New Zealand Dollar', SGD: 'Singapore Dollar', KRW: 'South Korean Won', BRL: 'Brazilian Real',
    RUB: 'Russian Ruble', MXN: 'Mexican Peso', TRY: 'Turkish Lira', ZAR: 'South African Rand',
    SEK: 'Swedish Krona', NOK: 'Norwegian Krone', AED: 'UAE Dirham'
};

const FALLBACK_SELECT_BG =
    "linear-gradient(135deg, rgba(42,82,152,0.18), rgba(42,82,152,0.08))";

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultElement = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const exchangeRateElement = document.getElementById('exchange-rate');
const ratesStatusElement = document.getElementById('rates-status');
const usdInrRateElement = document.getElementById('usd-inr-rate');

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(amount);
}

function getRate(from, to) {
    const fromRate = usdBaseRates[from];
    const toRate = usdBaseRates[to];
    if (typeof fromRate !== 'number' || typeof toRate !== 'number' || fromRate <= 0) return null;
    return toRate / fromRate;
}

function setSelectCurrencyIcon(selectElement, currencyCode) {
    const iconCode = currencyIcons[currencyCode];
    if (!iconCode) {
        selectElement.style.backgroundImage = FALLBACK_SELECT_BG;
        return;
    }
    const url = `https://flagcdn.com/w40/${iconCode}.png`;
    const testImage = new Image();
    testImage.onload = () => { selectElement.style.backgroundImage = `url('${url}')`; };
    testImage.onerror = () => { selectElement.style.backgroundImage = FALLBACK_SELECT_BG; };
    testImage.src = url;
}

function updateCurrencyIcons() {
    setSelectCurrencyIcon(fromCurrency, fromCurrency.value);
    setSelectCurrencyIcon(toCurrency, toCurrency.value);
}

function updateExchangeRateText(rate, from, to) {
    if (typeof rate !== 'number') {
        exchangeRateElement.textContent = 'Exchange rate unavailable for selected currencies';
        return;
    }
    exchangeRateElement.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

function setValidationState(message = '') {
    amountInput.setCustomValidity(message);
}

function updateRatesStatus() {
    ratesStatusElement.textContent = lastUpdatedLabel;
}

function countryCodeToEmoji(code) {
    if (!code || code.length !== 2) return '';
    return code
        .toUpperCase()
        .split('')
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
        .join('');
}

function decorateCurrencyOptionsWithFlags(selectElement) {
    for (const option of selectElement.options) {
        const countryCode = option.dataset.flag;
        const flagEmoji = countryCodeToEmoji(countryCode);
        if (!flagEmoji) continue;

        const code = option.value;
        const name = currencyNames[code] || option.textContent;
        option.textContent = `${flagEmoji} ${code} - ${name}`;
    }
}

function updateUsdInrReference() {
    const usdToInr = getRate('USD', 'INR');
    if (typeof usdToInr !== 'number') {
        usdInrRateElement.textContent = 'USD/INR unavailable';
        return;
    }
    usdInrRateElement.textContent = `1 USD = ${usdToInr.toFixed(4)} INR`;
}

function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const rate = getRate(from, to);

    updateCurrencyIcons();

    if (Number.isNaN(amount) || amount < 0) {
        resultElement.textContent = 'Please enter a valid amount';
        updateExchangeRateText(rate, from, to);
        setValidationState('Enter a non-negative number.');
        return;
    }

    setValidationState('');

    if (typeof rate !== 'number') {
        resultElement.textContent = 'Conversion unavailable';
        updateExchangeRateText(null, from, to);
        return;
    }

    resultElement.textContent = formatCurrency(amount * rate, to);
    updateExchangeRateText(rate, from, to);
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

function formatApiDate(yyyyMmDd) {
    const date = new Date(`${yyyyMmDd}T00:00:00Z`);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

async function fetchLiveRates() {
    try {
        const response = await fetch(LIVE_RATES_API, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (!data?.rates || typeof data.rates.INR !== 'number') throw new Error('Malformed rates payload');

        usdBaseRates = {
            ...usdBaseRates,
            ...data.rates,
            [BASE_CURRENCY]: 1
        };

        const asOf = data.date ? formatApiDate(data.date) : 'latest available date';
        lastUpdatedLabel = `As of ${asOf}`;
    } catch (_error) {
        lastUpdatedLabel = 'Using available rates';
    }

    updateRatesStatus();
    updateUsdInrReference();
    convertCurrency();
}

convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

decorateCurrencyOptionsWithFlags(fromCurrency);
decorateCurrencyOptionsWithFlags(toCurrency);
updateRatesStatus();
updateUsdInrReference();
convertCurrency();
fetchLiveRates();
