// Auth Imports
import { IRoute } from '@/types';
import { AiFillPicture } from 'react-icons/ai';
import { BsCollection } from 'react-icons/bs';
import { FaToolbox } from 'react-icons/fa';
import {
  HiOutlineCpuChip,
  HiOutlineDocumentText,
} from 'react-icons/hi2';

export const routes: IRoute[] = [
  {
    name: 'NFTs',
    description: 'list of NFTs',
    path: '/nfts',
    icon: <AiFillPicture className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Drop',
    description: 'list of Drops',
    path: '/drops',
    icon: (
      <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false
  },
  {
    name: 'Mint Pages',
    description: 'Mint Pages',
    path: '/mint-pages',
    icon: (
      <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Collections',
    description: 'manage your collections nfts',
    path: '/collections',
    icon: <BsCollection className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
  },
  {
    name: 'Utilities',
    description: 'helpful tools for creators',
    path: '/utilities',
    icon: (
      <FaToolbox className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
  },
];