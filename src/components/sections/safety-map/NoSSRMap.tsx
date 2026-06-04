'use client';

import dynamic from 'next/dynamic';
import { MapSkeleton } from './MapSkeleton';

export const NoSSRMap = dynamic(
  () => import('./MapContainer'),
  { ssr: false, loading: () => <MapSkeleton /> }
);
