export enum FilterButtonsE {
  All = 'All',
  Unknown = 'Unknown',
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
}

export type SvgIconProps = {
  className?: string;
};

export enum StatusFilterE {
  All = '',
  Dead = 'Dead',
  Alive = 'Alive',
  Unknown = 'unknown',
}

export enum CharacterFiltersE {
  Name = 'name',
  Status = 'status',
  Gender = 'gender',
  Page = 'page',
  Origin = 'origin',
}
