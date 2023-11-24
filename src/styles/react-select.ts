//Create custom style select
export const customStyles = {
  option: (provided: any) => ({
    ...provided,
    background: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
  }),
  menuList: (provided: any) => ({
    ...provided,
    background: "#FFF2F2",
    scrollbarColor: "transparent",
    scrollbarWidth: "thin",
    "::-webkit-scrollbar": {
      width: "10px",
      background: "transparent",
      borderRadius: "5px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "purple",
      borderRadius: "15px",
    },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    paddingLeft: '14px',
    height: '48px'
  }),
  control: (provided: any) => ({
    ...provided,
    background: "transparent",
    border: "1px solid #566B74",
    minHeight: "initial",
    boxShadow: "none",
    '&:hover': {
      border: "1px solid #566B74",
    }
  }),
  input: (provided: any) => ({
    ...provided,
    color: "white",
    boxShadow: 'none !important',
    "& input:focus": {
      boxShadow: 'none !important'
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "white",
    fontSize: "14px",
    lineHeight: "18px",
    fontFamily: "Roboto",
    fontWeight: "400",
    margin: "0",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
    margin: "0",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};