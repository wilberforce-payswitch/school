export const getInitials = (name: string | undefined) => {
    const firstInitial = name?.[0] || '';
    return `${firstInitial}`.toUpperCase();
};

export const  getAcronym = (name: string): string => {
    return name
    .trim() 
    .split(/\s+/) 
    .map(word => word.charAt(0).toUpperCase()) 
    .join("")
  }