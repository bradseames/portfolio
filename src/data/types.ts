export interface PageLinks {
  icon: string;
  title: string;
  path: string;
  description: string;
}

export interface Company {
  name: string;
  logo_path: string;
  roles: [];
}

export interface Role {
  company: Company;
  title: string;
  start: Date;
  end: Date;
  months: number;
  logo_path: string;
  accompisments: string[];
}

// export interface CategoriesGroup {
//     name: string;
//     categories: Category;
// }
//
// export interface Skill {
//     name: string;
//     category: string;
// }


