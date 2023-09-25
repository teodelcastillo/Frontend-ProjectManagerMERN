import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  CheckIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const CaseAppointmentActionsMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<CheckIcon />}>Mark as done</MenuItem>
        <MenuItem icon={<DeleteIcon />}>Delete appointment</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit appointment</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CaseAppointmentActionsMenu;
