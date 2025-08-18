const otpStore = new Map(); // email -> { otp, expires }

function saveOtpEmail(email, otp) {
    const expires = Date.now() + 5 * 60 * 1000; // 5 phút
    otpStore.set(email, { otp, expires });
}

function verifyOtpEmail(email, otp) {
    const record = otpStore.get(email);
    if (!record) return false;
    if (record.expires < Date.now()) {
        otpStore.delete(email);
        return false;
    }
    return record.otp === otp;
}

module.exports = {
    saveOtpEmail,
    verifyOtpEmail
};
