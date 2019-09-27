import ContentLoader from "react-content-loader"

const MyLoader = () => (
    <ContentLoader
        height={248}
        width={1248}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="60" y="48" rx="4" ry="4" width="300" height="150" />
        <rect x="380" y="60" rx="4" ry="4" width="150" height="10" />
        <rect x="380" y="85" rx="4" ry="4" width="150" height="10" />
        <rect x="380" y="110" rx="4" ry="4" width="150" height="10" />
        <rect x="830" y="30" rx="4" ry="4" width="300" height="70" />
        <rect x="830" y="110" rx="4" ry="4" width="300" height="110" />
    </ContentLoader>
)

export default MyLoader;

