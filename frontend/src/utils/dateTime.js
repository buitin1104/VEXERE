export function differenceInHours(date1, date2) {
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    const differenceInHours = (differenceInMilliseconds / (1000 * 60 * 60));
    const tempHour = (differenceInMilliseconds / (1000 * 60 * 60)).toFixed(1);
    return tempHour.endsWith('.0') ? differenceInHours.toFixed(0) : tempHour;
}
