import React from 'react';
import { iconMap } from '../icons';

export default function AppIcon({ icon, ...rest }) {
  const Icon = iconMap[icon];
  return Icon && <Icon {...rest} />;
}
