import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'main',
    title: 'Main',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/apps/home'
      },
      {
        id: 'members',
        title: 'Members',
        type: 'item',
        icon: 'people_outline',
        url: '/apps/members'
      }
    ]
  }
];
