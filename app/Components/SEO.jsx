import Head from 'next/head';



//import favicon from 

const SEO = ({ title, description, image, url, keywords }) => {
  const siteName = 'Artfolio'; // Replace with your website name
  const siteUrl = 'https://artfolio.space'; // Replace with your website URL
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/artfolio-one.appspot.com/o/Resources%2FScreenshot%202023-11-02%20172754.png?alt=media&token=dc11bae8-c13c-40d9-841f-f649ca77888f'; // Replace with a default image URL for social sharing

  const pageTitle = title || 'Artfolio';
  const pageDescription = description || 'Build a stunning, professional portfolio in 5 minutes';
  const pageImage = image || `${defaultImage}`;
  const pageUrl = url || siteUrl;
  const pageKeywords = keywords || 'Porfolio, art, art portfolios, how to build a portfolio, artfolio, nitron, Artfolio, quick, portfolios, Artfolio portfolios, Analytics, Easy art portfolio builder, art portfolio builder, web builder, websites, website builder, portfolio builder , producthunt Artfolio, Art Folio, artfolio.com, make portfolios artfolio, artfolio space'; // Replace with your desired keywords

  return (
    <head>

 
      {/* Title */}
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />

      {/* Description */}
      <meta name="description" content={pageDescription} />
      <meta property="og:description" content={pageDescription} />
      <meta name="twitter:description" content={pageDescription} />

      {/* Keywords */}
      <meta name="keywords" content={pageKeywords} />

      {/* URL */}
      <link rel="canonical" href={pageUrl} />
      <meta property="og:url" content={pageUrl} />

      {/* Image */}
      <meta property="og:image" content={pageImage} />
      <meta name="twitter:image" content={pageImage} />

      {/* Site Name */}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Favicon */}
      <link rel=" icon" href="/favicon.ico" />
      
    </head>
  );
};

export default SEO;