
/**
 * Represents the values stored on the ViewState Store
 * @interface ViewState
 */

export interface ViewState {

    /**
     * Boolean to track the file uploading state
     * @type {boolean}
     */
    isFileUploading: boolean;
    isOutstandingProductsLoading: boolean;
    isProductsPageLoading: boolean;
    isPasswordResetted: boolean;

    isResetPasswordTokenValid: boolean;
    isResetPasswordRestError: boolean;
    isResetPasswordTokenExpired: boolean;
    isResetPasswordChangeSuccess: boolean;
    isProductSearchActive: boolean;
}

/**
 * Specify initial state for ViewState
 */
export const initialViewState: ViewState = {
    isFileUploading: false,
    isOutstandingProductsLoading: false,
    isProductsPageLoading: false,
    isPasswordResetted: false,
    isResetPasswordTokenValid: false,
    isResetPasswordRestError: false,
    isResetPasswordTokenExpired: false,
    isResetPasswordChangeSuccess: false,
    isProductSearchActive: false,
};

