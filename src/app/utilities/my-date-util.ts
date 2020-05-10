export function dateTimeEquals(a: Date, b: Date): boolean {
    if (a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate() &&
      a.getHours() === b.getHours() &&
      a.getMinutes() === b.getMinutes()
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  export function dateEquals(a: Date, b: Date): boolean {
    if (a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()) {
      return true;
    } else {
      return false;
    }
  }