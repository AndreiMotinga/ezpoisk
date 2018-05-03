import React from "react";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Menu, { MenuItem } from "material-ui/Menu";

const ITEM_HEIGHT = 48;

const Action = ({
  listing,
  anchorEl,
  handlePath,
  handleDestroy,
  currentUser,
  handleClick,
  handleClose
}) => {
  return (
    <div>
      <IconButton
        aria-label="More"
        aria-owns={anchorEl ? "long-menu" : null}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        <MenuItem path={`/listings/${listing.id}`} onClick={handlePath}>
          Перейти
        </MenuItem>
        {currentUser &&
          listing.attributes.user.id === currentUser.id && (
            <div>
              <MenuItem
                path={`/listings/${listing.id}/edit`}
                onClick={handlePath}
              >
                Редактировать
              </MenuItem>
              <MenuItem id={listing.id} onClick={handleDestroy}>
                Удалить
              </MenuItem>
            </div>
          )}
      </Menu>
    </div>
  );
};

export default Action;
