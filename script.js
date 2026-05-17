// Static exchange rates expressed as value of 1 USD in each currency.
// Conversions are derived from this single base to keep cross-rates consistent.
const usdBaseRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.53,
    INR: 82.68,
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

// Currency symbol icons shown in select background (flags are not always valid for currencies like EUR)
const currencyIcons = {
    USD: 'us',
    EUR: 'eu',
    GBP: 'gb',
    JPY: 'jp',
    INR: 'in',
    AUD: 'au',
    CAD: 'ca',
    CHF: 'ch',
    CNY: 'cn',
    NZD: 'nz',
    SGD: 'sg',
    KRW: 'kr',
    BRL: 'br',
    RUB: 'ru',
    MXN: 'mx',
    TRY: 'tr',
    ZAR: 'za',
    SEK: 'se',
    NOK: 'no',
    AED: 'ae'
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

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function getRate(from, to) {
    const fromRate = usdBaseRates[from];
    const toRate = usdBaseRates[to];

    if (typeof fromRate !== 'number' || typeof toRate !== 'number' || fromRate <= 0) {
        return null;
    }

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

    testImage.onload = () => {
        selectElement.style.backgroundImage = `url('${url}')`;
    };

    testImage.onerror = () => {
        selectElement.style.backgroundImage = FALLBACK_SELECT_BG;
    };

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

    const result = amount * rate;
    resultElement.textContent = formatCurrency(result, to);
    updateExchangeRateText(rate, from, to);
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

convertCurrency();
