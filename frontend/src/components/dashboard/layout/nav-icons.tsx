import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { ArticleIcon } from '@phosphor-icons/react/dist/ssr/Article';
import { CheckSquareIcon } from '@phosphor-icons/react/dist/ssr/CheckSquare';
import { ChalkboardIcon } from '@phosphor-icons/react/dist/ssr/Chalkboard';

export const navIcons = {
  'house': HouseIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  'prova': ArticleIcon,
  'check-square': CheckSquareIcon,
  'chalkboard': ChalkboardIcon,
} as Record<string, Icon>;
