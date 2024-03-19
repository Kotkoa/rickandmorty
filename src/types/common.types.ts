export const enum FilterButtonsE {
  All = 'All',
  Unknown = 'Unknown',
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
}

export const enum GenderFilterE {
  All = '',
  Unknown = 'unknown',
  Female = 'female',
  Male = 'male',
  Genderless = 'genderless',
}

export type PropsI = {
  className?: string;
};

export const enum StatusFilterE {
  All = '',
  Dead = 'Dead',
  Alive = 'Alive',
  Unknown = 'unknown',
}

export const enum CharacterFiltersE {
  Name = 'name',
  Type = 'type',
  Species = 'species',
  Status = 'status',
  Gender = 'gender',
  Page = 'page',
}
