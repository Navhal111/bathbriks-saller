export const locationData = {
    India: {
        Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
        Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
        Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    },
    USA: {
        California: ['Los Angeles', 'San Francisco', 'San Diego'],
        Texas: ['Houston', 'Dallas', 'Austin'],
        NewYork: ['New York City', 'Buffalo', 'Albany'],
    },
    Canada: {
        Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
        BritishColumbia: ['Vancouver', 'Victoria', 'Kelowna'],
        Quebec: ['Montreal', 'Quebec City', 'Laval'],
    },
};

export type Country = keyof typeof locationData;
export type State = keyof typeof locationData[Country];