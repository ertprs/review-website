import ContentLoader from "react-content-loader"
import _isEmpty from 'lodash/isEmpty';

export const SocialMediaPlaceholder = () => {
    return (
        <ContentLoader
            height={216}
            width={350}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="16" y="16" rx="4" ry="4" width="318" height="80" />
            <rect x="16" y="106" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="136" rx="4" ry="4" width="318" height="20" />
        </ContentLoader>
    )
}

export const AnalysisReportsPlaceholder = () => {
    return (
        <ContentLoader
            height={573}
            width={350}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="16" y="16" rx="4" ry="4" width="318" height="80" />
            <rect x="16" y="106" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="136" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="166" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="196" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="226" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="256" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="286" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="316" rx="4" ry="4" width="318" height="20" />
            <rect x="16" y="346" rx="4" ry="4" width="318" height="20" />
        </ContentLoader>
    )
}

export const TrafficReportsPlaceholder = () => {
    return (
        <div className="abc-lg">
            <style jsx>{`
                @media only screen (max-width: 767px) {
                    .abc-lg: {
                        display: none
                    }
                }
            `}</style>
            <ContentLoader
                height={409}
                width={350}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="16" y="16" rx="4" ry="4" width="318" height="80" />
                <rect x="16" y="106" rx="4" ry="4" width="318" height="20" />
                <rect x="16" y="136" rx="4" ry="4" width="318" height="20" />
                <rect x="16" y="166" rx="4" ry="4" width="318" height="20" />
                <rect x="16" y="196" rx="4" ry="4" width="318" height="20" />
                <rect x="16" y="226" rx="4" ry="4" width="318" height="20" />
            </ContentLoader>
        </div>
    )
}