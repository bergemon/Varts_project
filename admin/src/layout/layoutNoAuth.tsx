

type Props = {
    children: React.ReactNode;
}

export const LayoutNoAuth = ({ children }: Props) => {
    return (
        <main className="h-screen bg-black/10 flex justify-center items-center">
            {children}
        </main>
    );
};