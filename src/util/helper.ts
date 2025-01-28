export const getInitials = (name: string | undefined) => {
    const firstInitial = name?.[0] || '';
    return `${firstInitial}`.toUpperCase();
};