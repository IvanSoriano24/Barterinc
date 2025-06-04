/**
 * Controlador para cotizar una inversión (rol: investor)
 */
exports.quoteInvestor = (req, res) => {
    // Se extraen los valores enviados desde el frontend
    const { amount, rate, months } = req.body;

    // Verificación: todos los campos son obligatorios
    if (!amount || !rate || !months) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Cálculo de la ganancia total por invertir (interés simple anual prorrateado)
    const gain = (amount * (rate / 100) * months) / 12;

    // Cálculo del total que se recibirá al final del plazo
    const total = amount + gain;

    // Cálculo de la ganancia mensual estimada
    const monthlyGain = gain / months;

    // Respuesta al cliente con los resultados
    return res.json({
        amount, // Monto invertido
        rate,   // Tasa de interés anual (%)
        months, // Duración en meses
        gain: gain.toFixed(2),             // Ganancia total
        total: total.toFixed(2),           // Total al retirar la inversión
        monthlyGain: monthlyGain.toFixed(2) // Ganancia mensual
    });
};

/**
 * Controlador para cotizar un préstamo (rol: lender)
 */
exports.quoteLender = (req, res) => {
    // Se extraen los valores enviados desde el frontend
    const { loanAmount, rate, months, frequency = 'monthly' } = req.body;

    // Verificación: todos los campos son obligatorios
    if (!loanAmount || !rate || !months) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Cálculo de los intereses generados (interés simple anual prorrateado)
    const interest = (loanAmount * (rate / 100) * months) / 12;

    // Cálculo del total a pagar (monto del préstamo + intereses)
    const totalToPay = loanAmount + interest;

    // Número de pagos según la frecuencia elegida (mensual o quincenal)
    const numPayments = frequency === 'biweekly' ? months * 2 : months;

    // Cálculo del pago por periodo (mensual o quincenal)
    const paymentPerPeriod = totalToPay / numPayments;

    // Respuesta al cliente con los resultados
    return res.json({
        loanAmount,        // Monto del préstamo
        rate,              // Tasa de interés anual (%)
        months,            // Duración del préstamo en meses
        frequency,         // Frecuencia de pagos: 'monthly' o 'biweekly'
        interest: interest.toFixed(2),             // Interés total generado
        totalToPay: totalToPay.toFixed(2),         // Total a pagar
        paymentPerPeriod: paymentPerPeriod.toFixed(2), // Pago por cada periodo
        numPayments        // Total de pagos que se harán
    });
};
