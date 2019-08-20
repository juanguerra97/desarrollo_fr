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
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Cursos',
    url: '/cursos',
    icon: 'icon-drop'
  },
  {
    name: 'Asignaciones',
    url: '/asignaciones/lista',
    icon: 'icon-drop'
  },
  {
    title: true,
    name: 'Reportes'
  },
  {
    name: 'Planificaciones',
    url: '/reportes/planificacion',
    icon: 'icon-drop'
  },
  {
    name: 'Catedraticos',
    url: '/reportes/catedraticos',
    icon: 'icon-pencil'
  },
  {
    name: 'Cursos',
    url: '/reportes/cursos',
    icon: 'icon-pencil'
  }
];
