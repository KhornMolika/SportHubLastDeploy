import Helmet from "react-helmet";

const HeadTags = ({
  title = "Portfolio - your name",
  metaDescription = "default description",
  ogImage = "default-image-url",
}) => {
  return (
    <Helmet>
      <title>SportHub</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" key="description" content={metaDescription} />
      <meta name="title" key="title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta charSet="utf-8" />
      <meta name="thumbnail" content={ogImage} />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:description"
        key="og:description"
        content={metaDescription}
      />
      <meta property="og:image" key="og:image" content={ogImage} />
    </Helmet>
  );
};

export default HeadTags;
