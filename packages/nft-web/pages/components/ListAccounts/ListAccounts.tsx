import {ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography} from "@mui/material";
import {AccountsData} from "../../interfaces/interfaces";
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import {StyledListAccounts} from "./ListAccounts.styles";

const ListAccounts = ({accounts}: AccountsData) => {
  return (
      <StyledListAccounts subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            <Typography>Accounts:</Typography>
        </ListSubheader>
      }>
            {accounts.map((account) => {
                return (
                    <ListItem key={account}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceWalletTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={account} />
                        </ListItemButton>
                    </ListItem>
                )
            }
        )}
        </StyledListAccounts>
  );

}

export default ListAccounts;
