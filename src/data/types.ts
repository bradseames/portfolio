
export interface IPageLinks {
    icon: 'tabler_icon';
    title: string;
    path: string;
    description: string;
}

export interface ICompany {
    name: string;
    logo_path: string;
    roles: [];
}

export interface IRole {
    company: Company;
    title: string;
    start: date;
    end: date;
    months: int;
    logo_path: string;
    accompisments: string[];
}
export interface CategoriesGroup {
    name: string;
    categories: Category[];
}
export interface ISkill {
    name: string;
    category: string;
}


