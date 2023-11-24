import Logo from 'public/assets/vector/logo.svg';
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse';
import SupportIcon from 'public/assets/vector/support_icon.svg';

type Props = {
    children: React.ReactNode;
}

export const LayoutNoAuth = ({ children }: Props) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <MouseParallaxContainer
                className="parallax"
                containerStyle={{
                    width: "100%",
                    height: '100%'
                }}
                globalFactorX={0.3}
                globalFactorY={0.3}
                resetOnLeave
            >
                <MouseParallaxChild
                    factorX={0.6}
                    factorY={0.6}
                    className='absolute w-full h-full bg-primary bg-no-repeat bg-cover'
                    style={{
                        transform: "scale(1.2)",
                        backfaceVisibility: "hidden",
                        zIndex: '-1'
                    }}
                />
                <div className="h-full flex flex-col py-[5vh] px-10">
                    <div>
                        <div className="flex justify-center">
                            <Logo className="w-[10.26vw]" />
                        </div>
                        {children}
                    </div>
                    <div className="flex mt-auto justify-between items-center">
                        <div className="text-gray">Пользовательское соглашение</div>
                        <div className="text-white flex items-center gap-2.5">
                            <SupportIcon />
                            Служба поддержки
                        </div>
                    </div>
                </div>
            </MouseParallaxContainer>
        </div>
    );
};