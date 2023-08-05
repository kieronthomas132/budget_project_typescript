import Budget from "../Budget/Budget";
type HeadingProps = {
    title: string;
};

const Header = ({ title }: HeadingProps) => {

    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex flex-col pt-6">
                <h1 className='text-4xl pb-3 text-indigo-200'>{title}</h1>
                <Budget />
            </div>
        </div>
    );
};

export default Header;