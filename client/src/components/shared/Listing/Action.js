import React from "react";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Menu, { MenuItem } from "material-ui/Menu";
import { redirect } from "utils";

const ITEM_HEIGHT = 48;

class Action extends React.Component {
  state = {
    anchorEl: null
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { listing, handleDestroy, currentUser } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem data-path={`/listings/${listing.id}`} onClick={redirect}>
            Перейти
          </MenuItem>
          {currentUser &&
            (currentUser.admin ||
              listing.attributes.user.id === currentUser.id) && (
              <div>
                <MenuItem
                  data-path={`/listings/${listing.id}/edit`}
                  onClick={redirect}
                >
                  Редактировать
                </MenuItem>
                <MenuItem data-id={listing.id} onClick={handleDestroy}>
                  Удалить
                </MenuItem>
              </div>
            )}
        </Menu>
      </div>
    );
  }
}

export default Action;
