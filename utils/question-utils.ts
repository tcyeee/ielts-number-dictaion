import { InputCategory } from "@/typing/enums"

export function normalizeInput(category: InputCategory, input: string): string | number {
    switch (category) {
        case InputCategory.LARGE_NUMBER:
        case InputCategory.DECIMAL:
        case InputCategory.PRICE:
            // Remove commas, spaces, currency symbols
            const cleanNum = input.replace(/[,\s$£€]/g, "");
            return isNaN(Number(cleanNum)) ? input : Number(cleanNum);
        case InputCategory.PERCENTAGE:
            const cleanPercent = input.replace(/[%\s]/g, "");
            return isNaN(Number(cleanPercent)) ? input : Number(cleanPercent);
        case InputCategory.PHONE:
            return input.replace(/\s/g, "")
        case InputCategory.TIME:
            return parseTimeToMinutes(input)
        case InputCategory.DATE:
            return parseDateToISO(input)
        case InputCategory.MIXED:
            return input.toUpperCase().replace(/\s/g, "")
        default:
            return input
    }
}

function parseTimeToMinutes(input: string): number {
    try {
        const lower = input.toLowerCase().trim();
        let [time, modifier] = lower.split(/(?=[ap]m)/);
        let [hours, minutes] = time.replace(/[.:]/, ':').split(':').map(Number);
        if (isNaN(minutes)) minutes = 0;
        if (modifier === 'pm' && hours < 12) hours += 12;
        if (modifier === 'am' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    } catch (e) {
        return 0;
    }
}

function parseDateToISO(input: string): string {
    // Basic normalization for date comparison
    // Removes ordinals (st, nd, rd, th), spaces, and commas
    // Converts to uppercase
    return input.toUpperCase()
        .replace(/(\d+)(ST|ND|RD|TH)/, '$1')
        .replace(/[,.\s]/g, '');
}



export const QUESTION_CATEGORIES = [
    {
        id: "Date",
        label: "Date",
        icon: "icon--fluent--calendar-date-24-regular",
        bgClass: "bg-blue",
    },
    {
        id: "Time",
        label: "Time",
        icon: "icon--feather--clock",
        bgClass: "bg-orange",
    },
    {
        id: "Phone",
        label: "Phone",
        icon: "icon--f7--phone",
        bgClass: "bg-green",
    },
    {
        id: "Price",
        label: "Price",
        icon: "icon--bx--dollar-circle",
        bgClass: "bg-red",
    },
    {
        id: "Measurement",
        label: "Measurement",
        icon: "icon--feather--sliders",
        bgClass: "bg-purple",
    },
    {
        id: "Address",
        label: "Address",
        icon: "icon--mynaui--map-pinned",
        bgClass: "bg-orange-dark",
    },
    {
        id: "Quantity",
        label: "Quantity",
        icon: "icon--feather--box",
        bgClass: "bg-teal",
    },
    {
        id: "Percentage",
        label: "Percentage",
        icon: "icon--feather--percent",
        bgClass: "bg-indigo",
    },
];

