import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
}

export const ModalComponent = ({ open, onClose, onConfirm, title, children }: Props) => {
    return (
        <Dialog open={open} handler={onClose}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                {children}
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    <span>Отменить</span>
                </Button>
                <Button type="submit" variant="gradient" color="green" onClick={onConfirm}>
                    <span>Подтвердить</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}