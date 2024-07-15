export const formatDate = (date) => {
    // Get the month, day, and year
    const month = date.toLocaleString("en-US", { month: "short" }); //  month is abbreviated to three letters (e.g., Jan, Feb).
    const day = date.getDate(); //  day is the day of the month.
    const year = date.getFullYear(); // year is the four-digit year.
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };
  // example:
//   const date = new Date('2024-03-16');
// const formattedDate = formatDate(date);
// console.log(formattedDate); // Output: "16-Mar-2024"

export function dateFormatter(dateString) {
    const inputDate = new Date(dateString); // Convert the string to a Date object
  
    if (isNaN(inputDate)) { // Check if the Date object is valid
      return "Invalid Date"; // Return "Invalid Date" if the input is not a valid date
    }
  
    const year = inputDate.getFullYear(); // Get full year
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Get month and pad with zero if needed
    const day = String(inputDate.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  
    const formattedDate = `${year}-${month}-${day}`; // Create formatted date string
    return formattedDate; // Return formatted date string
  }
// Example:  
//   const formattedDate = dateFormatter('2024-03-16');
// console.log(formattedDate); // Output: "2024-03-16"

export function getInitials(fullName) {
    // Check if the fullName has at least two characters
    if (fullName?.length < 2) {
        return fullName.toUpperCase(); // Return the full name as uppercase if it's less than two characters
    }

    // Take the first two letters and make them uppercase
    const initials = fullName?.slice(0, 2).toUpperCase();

    // Return the initials
    return initials;
}
export const PRIOTITYSTYELS = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
  };
  
  export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in-progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
  
  export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];
