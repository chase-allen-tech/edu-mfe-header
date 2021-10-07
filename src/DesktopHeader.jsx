import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Local Components
import { Menu, MenuTrigger, MenuContent } from './Menu';
import Avatar from './Avatar';
import { LinkedLogo, Logo } from './Logo';
import cupImg from './assets/cup1.png';

// i18n
import messages from './Header.messages';

// Assets
import { CaretIcon } from './Icons';

class DesktopHeader extends React.Component {
  constructor(props) { // eslint-disable-line no-useless-constructor
    super(props);
  }

  renderMainMenu() {
    const { mainMenu } = this.props;

    // Nodes are accepted as a prop
    if (!Array.isArray(mainMenu)) {
      return mainMenu;
    }

    return mainMenu.map((menuItem) => {
      const {
        type,
        href,
        content,
        submenuContent,
      } = menuItem;

      if (type === 'item') {
        return (
          <a key={`${type}-${content}`} className="nav-link h-100 d-flex align-items-center hover-opacity trans-2" href={href}>{content}</a>
        );
      }

      return (
        <Menu key={`${type}-${content}`} tag="div" className="nav-item" respondToPointerEvents>
          <MenuTrigger tag="a" className="nav-link h-100 d-inline-flex align-items-center" href={href}>
            {content} <CaretIcon role="img" aria-hidden focusable="false" />
          </MenuTrigger>
          <MenuContent className="pin-left pin-right shadow py-2">
            {submenuContent}
          </MenuContent>
        </Menu>
      );
    });
  }

  renderNotificationMenu() {
    const {
      userMenu,
      avatar,
      username,
      intl,
    } = this.props;

    return (
      <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
        <MenuTrigger
          tag="button"
          aria-label={intl.formatMessage(messages['header.label.account.menu.for'], { username })}
          className="btn d-inline-flex align-items-center pl-2 pr-2"
        >
          <a href="#" className="d-flex align-items-center hover-opacity trans-2">
            <i className="bi bi-bell-fill fsp-22 ms-3 color-notification cursor-pointer "
              id="notifation-icon"></i>
          </a>
        </MenuTrigger>
        <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow pt-0 notification">
          <div className="py-2 px-3 d-flex bg-white justify-content-between" style={{ borderRadius: "10px 10px 0px 0px" }}>
            <div className="ml-2"><i className="bi bi-gear"></i></div>
            <span className="fsp-16">Notification</span>
            <div className="mr-2"><i className="bi bi-check2"></i></div>
          </div>
          <div className="d-flex justify-content-evenly align-items-center px-2 py-3">
            <img src="https://s3.eu-west-3.amazonaws.com/images.digitallearningsolution.net/Ellipse_27.png" className="size-28 ml-2 mr-3" />
            <div className="fsp-16"><b>Nayla</b> Mentioned you in a <b>Comment</b></div>
          </div>
          <div className="d-flex justify-content-evenly align-items-center px-2">
            <img src="https://s3.eu-west-3.amazonaws.com/images.digitallearningsolution.net/Ellipse_27.png" className="size-28 ml-2 mr-3" />
            <div className="fsp-16"><b>Nayla</b> Mentioned you in a <b>Comment</b></div>
          </div>
        </MenuContent>
      </Menu>
    );
  }

  renderUserMenu() {
    const {
      userMenu,
      avatar,
      username,
      intl,
    } = this.props;

    let userLogo = 'UN';
    let usernameArray = username.split(" ");
    if(usernameArray.length > 1) {
      userLogo = usernameArray[0].substring(0, 1) + usernameArray[1].substring(0, 1);
    } else if(username.length >= 2) {
      userLogo = username.substring(0, 2)
    } else {
      userLogo = username;
    }

    return (
      <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
        <MenuTrigger
          tag="button"
          aria-label={intl.formatMessage(messages['header.label.account.menu.for'], { username })}
          className="btn btn-outline-primary d-inline-flex align-items-center pl-2 pr-2 hover-opacity trans-2"
        >
          <span className="d-flex justify-content-center align-items-center bg-pink rounded-pill size-26 text-white mr-2" id="nav-profile-ab">
            <div className="fsp-11 text-uppercase">{userLogo}</div>
          </span>
          {username}
          {/* <CaretIcon role="img" aria-hidden focusable="false" /> */}
        </MenuTrigger>
        <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
          {userMenu.map(({ type, href, content }) => (
            <a className={`dropdown-${type} fsp-16 color-main3`} key={`${type}-${content}`} href={href}>{content}</a>
          ))}
        </MenuContent>
      </Menu>
    );
  }

  renderLoggedOutItems() {
    const { loggedOutItems } = this.props;

    return loggedOutItems.map((item, i, arr) => (
      <a
        key={`${item.type}-${item.content}`}
        className={i < arr.length - 1 ? 'btn mr-2 btn-link' : 'btn mr-2 btn-outline-primary'}
        href={item.href}
      >
        {item.content}
      </a>
    ));
  }

  render() {
    const {
      logo,
      logoAltText,
      logoDestination,
      loggedIn,
      intl,
    } = this.props;
    const logoProps = { src: logo, alt: logoAltText, href: logoDestination };
    const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'mw-100' : null;

    return (
      <header className="site-header-desktop">
        <a className="nav-skip sr-only sr-only-focusable" href="#main">{intl.formatMessage(messages['header.label.skip.nav'])}</a>
        <div className={`container-fluid ${logoClasses}`}>
          <div className="nav-container position-relative d-flex align-items-center hp-60 mx-4">
            {logoDestination === null ? <Logo className="logo" src={logo} alt={logoAltText} /> : <LinkedLogo className="logo" {...logoProps} />}
            {/* <nav
              aria-label={intl.formatMessage(messages['header.label.main.nav'])}
              className="nav main-nav h-100"
            >
              {this.renderMainMenu()}
            </nav> */}

            <div className="h-100 ml-auto d-flex">
              {
                loggedIn && <>
                  <nav aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
                    className="nav secondary-menu-container align-items-center h-100"
                  >
                    <a href="http://app.digitallearningsolution.net/dashboard/progression" className="d-flex align-items-center hover-opacity trans-2">
                      <img src={cupImg} className="logo-icon size-24" />
                    </a>
                  </nav>
                  <nav aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
                    className="nav secondary-menu-container align-items-center ml-3 h-100"
                  >
                    {this.renderNotificationMenu()}
                  </nav>
                </>
              }
              <nav
                aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
                className="nav secondary-menu-container align-items-center ml-2 h-100 c-nav-avatar"
              >
                {loggedIn ? this.renderUserMenu() : this.renderLoggedOutItems()}
            </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

DesktopHeader.propTypes = {
  mainMenu: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
  })),
  loggedOutItems: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
  })),
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,

  // i18n
  intl: intlShape.isRequired,
};

DesktopHeader.defaultProps = {
  mainMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
};

export default injectIntl(DesktopHeader);
