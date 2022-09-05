import Head from "next/head";

const Meta = ({ keywords, description, title}: {keywords: string, description: string, title: string}) => {
    return(
        <Head>
            <meta name="viewport" content="width-device-width, initial-scale=1" />
            <meta name="keyword" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Instagram',
    keywords: 'socail media, interactive with people',
    description: 'interactive with people from around the world'
}


export default Meta