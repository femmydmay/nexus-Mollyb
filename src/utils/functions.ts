export function getOneMonthFromNow() {
  const currentDate = new Date();

  // Get the current month and year
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Calculate the month one month from now
  let oneMonthFromNowMonth = currentMonth + 1;

  if (oneMonthFromNowMonth > 11) {
    oneMonthFromNowMonth = 0; // Reset to January
    currentYear++; // Increment the year
  }

  const oneMonthFromNow = new Date(
    currentYear,
    oneMonthFromNowMonth,
    currentDate.getDate()
  );

  return oneMonthFromNow;
}


  export const isFileSizeValid = (file: File, maxSizeInKB: number) => {
    return file.size <= maxSizeInKB * 1024;
  }; 