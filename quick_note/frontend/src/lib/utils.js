// Function to format the date of creation for the note
export function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short", 
        day: "numeric",
        year: "numeric"
    })
}