import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/dashboard',
  },
  {
    name: 'Funding Impact',
    imgUrl: withdraw,
    link: '/donar-impact',
  },
  {
    name: 'Contact Us',
    imgUrl: profile,
    link: '/contactUs',
  },

];