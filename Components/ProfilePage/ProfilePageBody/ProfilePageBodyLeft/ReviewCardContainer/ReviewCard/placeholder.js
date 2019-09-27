import ContentLoader from "react-content-loader"

export const ReviewPlaceholder = () => (
    <ContentLoader
        height={186}
        width={763}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="70" y="16" rx="4" ry="4" width="117" height="10" />
        <rect x="600" y="16" rx="3" ry="3" width="150" height="10" />
        <rect x="70" y="35" rx="3" ry="3" width="85" height="10" />
        <rect x="0" y="80" rx="3" ry="3" width="350" height="10" />
        <rect x="0" y="110" rx="3" ry="3" width="380" height="10" />
        <rect x="0" y="140" rx="3" ry="3" width="201" height="10" />
        <circle cx="30" cy="30" r="30" />
    </ContentLoader>
)

