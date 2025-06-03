// controllers/quote.controller.js
exports.quoteInvestor = (req, res) => {
    const { amount, rate, months } = req.body;

    if (!amount || !rate || !months) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const gain = (amount * (rate / 100) * months) / 12;
    const total = amount + gain;
    const monthlyGain = gain / months;

    return res.json({
        amount,
        rate,
        months,
        gain: gain.toFixed(2),
        total: total.toFixed(2),
        monthlyGain: monthlyGain.toFixed(2),
    });
};

exports.quoteLender = (req, res) => {
    const { loanAmount, rate, months, frequency = 'monthly' } = req.body;

    if (!loanAmount || !rate || !months) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const interest = (loanAmount * (rate / 100) * months) / 12;
    const totalToPay = loanAmount + interest;
    const numPayments = frequency === 'biweekly' ? months * 2 : months;
    const paymentPerPeriod = totalToPay / numPayments;

    return res.json({
        loanAmount,
        rate,
        months,
        frequency,
        interest: interest.toFixed(2),
        totalToPay: totalToPay.toFixed(2),
        paymentPerPeriod: paymentPerPeriod.toFixed(2),
        numPayments
    });
};