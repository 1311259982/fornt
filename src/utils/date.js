/**
 * 格式化日期为友好显示格式
 * @param {string|Date} date - 日期字符串或Date对象
 * @returns {string} 格式化后的日期字符串（如：2023-05-15 14:30）
 */
export const formatDate = (date) => {
    if (!date) return ''

    // 处理字符串类型的日期
    const targetDate = typeof date === 'string' ? new Date(date) : date

    // 检查日期是否有效
    if (isNaN(targetDate.getTime())) return date

    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const day = String(targetDate.getDate()).padStart(2, '0')
    const hours = String(targetDate.getHours()).padStart(2, '0')
    const minutes = String(targetDate.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 计算相对时间（如：3分钟前、2小时前、1天前）
 * @param {string|Date} date - 日期字符串或Date对象
 * @returns {string} 相对时间字符串
 */
export const formatRelativeTime = (date) => {
    if (!date) return ''

    const targetDate = typeof date === 'string' ? new Date(date) : date
    if (isNaN(targetDate.getTime())) return formatDate(date)

    const now = new Date()
    const diffInSeconds = Math.floor((now - targetDate) / 1000)

    if (diffInSeconds < 60) {
        return `${diffInSeconds}秒前`
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}分钟前`
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}小时前`
    } else if (diffInSeconds < 604800) {
        return `${Math.floor(diffInSeconds / 86400)}天前`
    } else {
        return formatDate(date)
    }
}
