
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
    
}

/**
 * Specify initial state for ViewState
 */
export const initialViewState: ViewState = {
    isFileUploading: false,
};

