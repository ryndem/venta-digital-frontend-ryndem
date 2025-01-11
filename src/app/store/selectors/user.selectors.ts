import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../states/user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserIsLogged = createSelector(
    selectUserState,
    (state) => state.isLogged
);

export const selectCurrentUser = createSelector(
    selectUserState,
    (state) => state.user
);

export const selectUserIsLoading = createSelector(
    selectUserState,
    (state) => state.isLoading
);

export const selectUserHasOrderItemsSelected = createSelector(
    selectUserState,
    (state) => state.hasOrderItemsSelected
);

export const selectUserAddresses = createSelector(
    selectUserState,
    (state) => state?.addresses || []
);

export const selectUserName = createSelector(
    selectUserState,
    (state) => state.name
);

export const selectIsLoginModalOpened = createSelector(
    selectUserState,
    (state) => state.isLoginModalOpened
);