import type { StaticImageData } from 'next/image';
import adgmWebsite from '@/assets/projects/adgm-website.jpg';
import apcMobileDashboard from '@/assets/projects/apc-crm-mobile-dashboard.jpg';
import apcMobileJobs from '@/assets/projects/apc-crm-mobile-jobs.jpg';
import apcMobileSignIn from '@/assets/projects/apc-crm-mobile-sign-in.jpg';
import apcSignIn from '@/assets/projects/apc-crm-sign-in.jpg';
import askbaseAttach from '@/assets/projects/askbase-attach-database.jpg';
import askbaseHome from '@/assets/projects/askbase-home.jpg';
import betterHomesWebsite from '@/assets/projects/better-homes-website.jpg';
import carLocationSearch from '@/assets/projects/car-rental-location-search.jpg';
import carSearch from '@/assets/projects/car-rental-search.jpg';
import carWelcome from '@/assets/projects/car-rental-welcome.jpg';
import engageSignIn from '@/assets/projects/engage-sign-in.jpg';
import groupCaptainDashboard from '@/assets/projects/group-captain-dashboard.jpg';
import groupCaptainSignIn from '@/assets/projects/group-captain-sign-in.jpg';
import mealsAdmin from '@/assets/projects/meals-app-admin-sign-in.jpg';
import mealsMobile from '@/assets/projects/meals-app-mobile.jpg';
import nextdeskDashboard from '@/assets/projects/nextdesk-dashboard.jpg';
import nexttalentSignIn from '@/assets/projects/nexttalent-sign-in.jpg';
import osbWebsite from '@/assets/projects/open-source-billing-website.jpg';
import rnbReceiver from '@/assets/projects/ring-n-bring-receiver-app.jpg';
import rnbPortal from '@/assets/projects/ring-n-bring-sales-portal.jpg';
import rnbWebsite from '@/assets/projects/ring-n-bring-website.jpg';

export type Shot = { src: StaticImageData; alt: string; caption: string };

/** Product screenshots for a case study. Projects without screenshots are simply left out. */
export type Showcase = {
  /** Product brand colour, used to tint the stage behind the screenshots. */
  brand: string;
  /** Main desktop screen in a browser frame. Mobile-only products use `phones` instead. */
  main?: Shot;
  /** Optional mobile screen, shown in a phone frame beside the main shot. */
  phone?: Shot;
  /** Mobile-only products: up to three screens shown side by side on the stage. */
  phones?: Shot[];
  more?: Shot[];
  /** Further mobile screens, shown as a row of phones. */
  apps?: Shot[];
};

export const showcases: Record<string, Showcase> = {
  'ring-n-bring': {
    brand: '#3b1e8c',
    main: { src: rnbWebsite, alt: 'Ring N Bring website home page', caption: 'Public website' },
    phone: { src: rnbReceiver, alt: 'Ring N Bring receiver app showing pending table payments', caption: 'Receiver app for venue staff' },
    more: [{ src: rnbPortal, alt: 'Ring N Bring sales portal dashboard with organisations, clients and venues', caption: 'Sales portal dashboard' }],
  },
  'better-homes': {
    brand: '#1f2a44',
    main: { src: betterHomesWebsite, alt: 'Better Homes website home page with property search', caption: 'Public website with property search' },
    more: [{ src: engageSignIn, alt: 'Engage real estate platform sign-in page', caption: 'Engage platform sign-in' }],
  },
  'grace-ai': {
    brand: '#312e81',
    main: { src: engageSignIn, alt: 'Engage real estate platform sign-in page', caption: 'Engage platform, home of the Grace assistant' },
  },
  'askbase-ai': {
    brand: '#0f5f58',
    main: { src: askbaseHome, alt: 'AskBase AI home screen: chat with your live database', caption: 'Chat with your live database' },
    more: [{ src: askbaseAttach, alt: 'AskBase AI panel for attaching a MySQL, PostgreSQL, MongoDB or Firestore database', caption: 'Attaching a database, with optional tenant isolation' }],
  },
  'meals-app': {
    brand: '#f2b632',
    main: { src: mealsAdmin, alt: 'NXBMeals admin portal sign-in', caption: 'Admin portal' },
    phone: { src: mealsMobile, alt: 'Meals mobile app home screen with balance and today\'s menu', caption: 'Employee mobile app' },
  },
  'group-captain': {
    brand: '#1e2a3b',
    main: { src: groupCaptainDashboard, alt: 'Group Captain dashboard with timesheet, EOD, attendance, projects and WFH request', caption: 'Dashboard' },
    more: [{ src: groupCaptainSignIn, alt: 'Group Captain sign-in page', caption: 'Sign-in' }],
  },
  nextdesk: {
    brand: '#1d4ed8',
    main: { src: nextdeskDashboard, alt: 'NextDesk dashboard with ticket status counts and per-department charts', caption: 'Ticket dashboard by department' },
  },
  nexttalent: {
    brand: '#6d28d9',
    main: { src: nexttalentSignIn, alt: 'NexTalent sign-in page', caption: 'Sign-in' },
  },
  'apc-crm': {
    brand: '#4a8406',
    main: { src: apcSignIn, alt: 'Affordable Pest Control CRM sign-in page', caption: 'Web CRM sign-in' },
    phone: { src: apcMobileDashboard, alt: 'APC mobile app dashboard with weekly job stats and an earnings chart', caption: 'Technician mobile app' },
    apps: [
      { src: apcMobileSignIn, alt: 'APC mobile app sign-in screen', caption: 'Mobile sign-in' },
      { src: apcMobileJobs, alt: 'APC mobile app daily job schedule with locations, times and prices', caption: 'Daily job schedule' },
      { src: apcMobileDashboard, alt: 'APC mobile app dashboard with weekly job stats and an earnings chart', caption: 'Job performance dashboard' },
    ],
  },
  'open-source-billing': {
    brand: '#0e7fa8',
    main: { src: osbWebsite, alt: 'Open Source Billing website showing the invoicing dashboard on a laptop', caption: 'Product website with the billing dashboard' },
  },
  'car-rental-marketplace': {
    brand: '#4b32d9',
    phones: [
      { src: carSearch, alt: 'Car rental app home screen with location search and recently viewed cars', caption: 'Home and search' },
      { src: carWelcome, alt: 'Car rental app welcome screen with sign-up and log-in', caption: 'Welcome and sign-up' },
      { src: carLocationSearch, alt: 'Car rental app location search listing airports, cities, train stations and hotels', caption: 'Location search' },
    ],
  },
  'abu-dhabi-global-management': {
    brand: '#0b3fa8',
    main: { src: adgmWebsite, alt: 'ADGM website home page', caption: 'Client website, ADGM' },
  },
};
