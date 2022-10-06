import {List, styled} from "@mui/material";

export const StyledListAccounts = styled(List)(({theme}) => {
  return {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'transparent',
    color: theme.palette.grey.A100,
    borderRadius: '8px',
    padding: '0',
    '& .MuiListSubheader-root': {
      color: theme.palette.grey.A100,
      backgroundColor: 'transparent',
    },
    '& .MuiListItem-root': {
      backgroundColor: theme.palette.grey.A700,
      borderRadius: '8px',
      '& .MuiButtonBase-root': {
        borderRadius: '8px',
      },
      '& .MuiTypography-root': {
        fontSize: '22px',
        letterSpacing: '0.5px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiListItemIcon-root': {
        minWidth: '40px',
        fontSize: '22px',
        color: theme.palette.grey.A100,
      },
    },
  };
});
