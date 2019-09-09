import months from './months.json';

const stringHelpers =  (method, value)=>{

    switch(method){
        case "shortenMonths": return shortenMonths(value);
        default: return null;
    }
}

const shortenMonths = (value)=>{
    const month =  value.substring(value.indexOf(" "), value.lastIndexOf(" ")).trim();
    const date = new Date(value.trim());
   return month.length <=4 ? value : date.getDate()+" " +months[month].abbreviation + " " +date.getFullYear();
}

export default stringHelpers;