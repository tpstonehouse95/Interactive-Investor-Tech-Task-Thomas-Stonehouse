export type newCustomerType = {
    userName: string,
    email: string,
    title: string,
    password: string,
    dateOfBirth: { day: string; month: string; year: string; },
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    mobileNumber: string
}
function getRandomString(): string {
    return Math.random().toString(36).substring(2, 7);
}

function getRandomTitle(): string {
    const titles = ['Mr.', 'Mrs.'];
    return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomDate(): { day: string, month: string, year: string } {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const randomYear = (Math.floor(Math.random() * (2025 - 1950 + 1)) + 1950).toString();
    const randomMonthIndex = Math.floor(Math.random() * 12);
    const randomMonth = months[randomMonthIndex];

    const maxDays = new Date(Number(randomYear), randomMonthIndex + 1, 0).getDate();
    const randomDay = (Math.floor(Math.random() * maxDays) + 1).toString().padStart(2, '0');

    return { day: randomDay, month: randomMonth, year: randomYear };
}

function getRandomPhoneNumber(): string {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
}

function getRandomCountry(): string {
    const countries = ['India', 'United States', 'Canada', 'Australia', 'Isreal', 'New Zealand', 'Singapore'];
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

export async function newTestCustomer(): Promise<newCustomerType> {
    const newCustomer: newCustomerType = {
        userName: getRandomString(),
        email: `${getRandomString()}@grr.la`,
        title: getRandomTitle(),
        password: getRandomString(),
        dateOfBirth: getRandomDate(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        company: getRandomString(),
        address1: getRandomString(),
        address2: getRandomString(),
        country: getRandomCountry(),
        state: getRandomString(),
        city: getRandomString(),
        zipCode: getRandomString(),
        mobileNumber: getRandomPhoneNumber()

    }
    return newCustomer;
}