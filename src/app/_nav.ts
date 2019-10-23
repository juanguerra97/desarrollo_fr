interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Asignaciones',
    url: '/asignaciones',
    icon: 'fa fa-university'
  },
  {
    name: 'Bases',
    icon: 'fa fa-archive',
    children: [
      {
        name: 'Carreras',
        url: '/bases/carreras',
        icon: 'fa fa-graduation-cap'
      },
      {
        name: 'Jornadas',
        url: '/bases/jornadas',
        icon: 'fa fa-calendar-o'
      },
      {
        name: 'Dias',
        url: '/bases/dias-jornada',
        icon: 'icon-calendar'
      },
      {
        name: 'Pensum',
        url: '/bases/pensum',
        icon: 'fa fa-id-card-o'
      },
      {
        name: 'Cursos',
        url: '/cursos',
        icon: 'fa fa-book'
      },
      {
        name: 'Pensum Curso',
        url: '/bases/pensum_curso',
        icon: 'fa fa-table'
      },
      {
        name: 'Catedraticos',
        url: '/bases/catedraticos',
        icon: 'fa fa-address-book'
      }
    ]
  },

  {
    name: 'Reportes',
    icon: 'fa fa-bar-chart',
    children: [
      {
        name: 'Planificaciones',
        url: '/reportes/planificacion',
        icon: 'icon-list'
      },
      {
        name: 'Catedraticos',
        url: '/reportes/catedraticos',
        icon: 'icon-user'
      },
      {
        name: 'Cursos',
        url: '/reportes/cursos',
        icon: 'fa fa-book'
      }
    ]
  },
  {
    name: 'App',
    url: 'https://dwumg.azurewebsites.net/descargas/android',
    icon: 'fa fa-android'
  },
];
