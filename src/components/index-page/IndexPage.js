import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ShareImage from "../../assets/share.jpg";

function IndexPage(props) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
      <meta name="msapplication-TileColor" content="#20262E" />
      <link rel="manifest" href="./manifest.json" />
      <meta name="theme-color" content="#20262E" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@Koeroesi86" />
      <meta name="twitter:title" content="Revoke Article 50 and remain in the EU." />
      <meta name="twitter:description" content="The government repeatedly claims exiting the EU is 'the will of the people'. We need to put a stop to this claim by proving the strength of public support now, for remaining in the EU. A People's Vote may not happen - so vote now." />
      <meta name="twitter:creator" content="@Koeroesi86" />
      <meta name="twitter:image" content={ShareImage} />
      <meta property="og:title" content="Revoke Article 50 and remain in the EU." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://chris.koro.si/petition/" />
      <meta property="og:image" content={ShareImage} />
      <meta property="og:description" content="The government repeatedly claims exiting the EU is 'the will of the people'. We need to put a stop to this claim by proving the strength of public support now, for remaining in the EU. A People's Vote may not happen - so vote now." />
      <meta property="og:site_name" content="Revoke Article 50 and remain in the EU." />
      <title>{props.staticContext.title}</title>
      <meta name="description" content="The government repeatedly claims exiting the EU is 'the will of the people'. We need to put a stop to this claim by proving the strength of public support now, for remaining in the EU. A People's Vote may not happen - so vote now." />
    </head>
    <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"/>
    <script src={props.staticContext.assets.index} />
    {process.env.NODE_ENV !== "development" && (
      <Fragment>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-9634043-15"/>
        <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-9634043-15');
      ` }} />
      </Fragment>
    )}
    </body>
    </html>
  );
}

IndexPage.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string
  }),
  staticContext: PropTypes.shape({
    assets: PropTypes.object,
    title: PropTypes.string
  }),
  history: PropTypes.object,
  match: PropTypes.object
};

export default IndexPage;
