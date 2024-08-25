

export function formatCurrency(amount) {
    return amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 0;
}