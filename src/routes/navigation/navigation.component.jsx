import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart-dropdown.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {signOutUser} from '../../utils/firebase/firebase.utils';
import {NavigationContainer, NavLink, NavLinks,LogoContainer} from './navigation.styles';


const Navigation = () => {
    const { currentUser }= useContext(UserContext);
    const {isCartOpen}= useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>

                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ?(
                            <NavLink as='span' onClick={signOutUser}>
                                SIGN OUT
                            </NavLink>) 
                            :(<NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                        )}
                    <CartIcon />
                </NavLinks>
                    {isCartOpen && <CartDropdown/>}
            </NavigationContainer>

            <Outlet />
        </Fragment>
    )
}

export default Navigation;