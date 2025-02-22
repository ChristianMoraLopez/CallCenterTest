
// lib/utils/formatters.js
export function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
  
  export function formatDate(dateString) {
    return new Date(dateString).toLocaleTimeString();
  }
  