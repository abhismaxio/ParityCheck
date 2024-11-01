const CompactNumberformatter = new Intl.NumberFormat(undefined, {notation:"compact"});
export function formatCompactNumber(number:number){
    return CompactNumberformatter.format(number)
}