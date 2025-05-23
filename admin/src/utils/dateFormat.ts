import { format } from 'date-fns';

export function dateFormat(dateString: string): string {
    return format(new Date(dateString), 'dd.MM.yyyy');
}