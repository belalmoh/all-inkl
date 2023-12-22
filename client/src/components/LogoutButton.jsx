import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

export const LogoutButton = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SignoutIcon = useColorModeValue(FaSignOutAlt, FaSignOutAlt);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`signout`}
      variant="ghost"
      color="current"
      marginLeft="2"
      icon={<SignoutIcon />}
      {...props}
    />
  );
};
