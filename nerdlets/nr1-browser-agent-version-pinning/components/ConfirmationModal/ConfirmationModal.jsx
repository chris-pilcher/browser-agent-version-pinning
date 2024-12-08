import React, { Fragment, useState } from 'react';
import { BlockText, Button, HeadingText, Modal, Stack, StackItem } from 'nr1';

function ConfirmationModal({ showModal, currentVersion, newVersion, onCancel, onConfirm }) {
    const isRemovingPinning = newVersion === null;
    const titleText = isRemovingPinning ? 'Remove Pinning' : 'Update Pinning';
    const messageText = createMessageText(isRemovingPinning, currentVersion, newVersion);
    const actionText = isRemovingPinning ? 'Remove' : 'Pin';
    const [isUpdating, setIsUpdating] = useState(false);
    return (
        <Modal hidden={!showModal} onClose={onCancel}>
            <HeadingText type={HeadingText.TYPE.HEADING_3}>{titleText}</HeadingText>
            <BlockText spacingType={[BlockText.SPACING_TYPE.EXTRA_LARGE, BlockText.SPACING_TYPE.OMIT]}>
                {messageText}
            </BlockText>
            <Stack>
                <StackItem>
                    <Button onClick={onCancel}>Cancel</Button>
                </StackItem>
                <StackItem>
                    <Button
                        type={isRemovingPinning ? Button.TYPE.DESTRUCTIVE : Button.TYPE.PRIMARY}
                        onClick={async () => {
                            setIsUpdating(true);
                            await onConfirm();
                            setIsUpdating(false);
                        }}
                        loading={isUpdating}
                    >
                        {actionText}
                    </Button>
                </StackItem>
            </Stack>
        </Modal>
    );
}

function createMessageText(isRemovingPinning, currentVersion, newVersion) {
    if (isRemovingPinning) {
        return (
            <Fragment>
                Are you sure you want to remove the <b>{currentVersion}</b> version pinning?
            </Fragment>
        );
    }

    if (currentVersion === null) {
        return (
            <Fragment>
                Are you sure you want to pin to version <b>{newVersion}</b>?
            </Fragment>
        );
    }

    return (
        <Fragment>
            Are you sure you want to update the version pinning from {currentVersion} to <b>{newVersion}</b>?
        </Fragment>
    );
}

export default ConfirmationModal;
